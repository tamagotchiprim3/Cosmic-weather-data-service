import { Component, OnDestroy, Output } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { cloneDeep } from 'lodash';
import { filter } from 'rxjs';
import {
  AIR_POLLUTION_CARD_TEMPLATE,
  WEATHER_CARD_TEMPLATE,
} from 'src/app/shared/constants/weather-card-temp.const';
import {
  IAirPollutionResponse,
  IGetCurrentWeather,
  IWeatherCard,
} from 'src/app/shared/interfaces/weather.interface';
import { WeatherApiService } from 'src/app/shared/services/weather-api.service';
import {
  geocodingByCity,
  geocodingByZip,
  getCurrentWeather,
} from 'src/app/store/current-weather/current-weather.actions';
import {
  selectAirPollution,
  selectCurrentWeather,
  selectLatitude,
  selectLocation,
  selectLongitude,
  selectTimezone,
} from 'src/app/store/current-weather/current-weather.selectors';
@UntilDestroy()
@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss'],
})
export class CurrentWeatherComponent implements OnDestroy {
  public currentWeather: IWeatherCard[];
  public airPollution: IAirPollutionResponse;
  public airComponents: IWeatherCard[];
  public location: string;
  public timezone: string;
  public latitude: number;
  public longitude: number;

  constructor(private store: Store, private weatherApi: WeatherApiService) {}
  ngOnDestroy(): void {}

  public clearEmptyCards(cards: IWeatherCard[]): IWeatherCard[] {
    return cards.filter((item) => {
      return item.value;
    });
  }

  public writeValueInCard(
    prop: IWeatherCard[],
    key: string,
    value: number,
    add?: string
  ): void {
    let conKey: string = key;
    if (add) {
      conKey += add;
    }
    prop[
      prop.findIndex((item) => {
        return item.key === conKey;
      })
    ].value = value;
  }

  public getCurrentWeather(
    location: IGetCurrentWeather | string | number
  ): void {
    if (typeof location === 'string') {
      this.store.dispatch(geocodingByCity({ data: location }));
    } else if (typeof location === 'number') {
      this.store.dispatch(geocodingByZip({ data: location }));
    } else {
      this.store.dispatch(getCurrentWeather({ data: location }));
    }

    this.store.select(selectLocation).subscribe((location: string): void => {
      this.location = location;
    });

    this.store.select(selectTimezone).subscribe((timezone: number): void => {
      if (timezone) {
        this.timezone = '+' + timezone / 3600 + ' UTC';
      }
    });

    this.store.select(selectLatitude).subscribe((latitude: number): void => {
      this.latitude = latitude;
    });

    this.store.select(selectLongitude).subscribe((longitude: number): void => {
      this.longitude = longitude;
    });

    this.store
      .select(selectCurrentWeather)
      .pipe(untilDestroyed(this), filter(Boolean))
      .subscribe((weather) => {
        const weatherData = cloneDeep(weather);
        if (weatherData.main) {
          Object.entries(weatherData.main).forEach(([key, value]) => {
            this.writeValueInCard(WEATHER_CARD_TEMPLATE, key, value);
          });
        }
        if (weatherData.wind) {
          Object.entries(weatherData.wind).forEach(([key, value]) => {
            this.writeValueInCard(WEATHER_CARD_TEMPLATE, key, value);
          });
        }
        if (weatherData.rain) {
          Object.entries(weatherData.rain).forEach(([key, value]) => {
            this.writeValueInCard(WEATHER_CARD_TEMPLATE, key, value, 'r');
          });
        }
        if (weatherData.snow) {
          Object.entries(weatherData.snow).forEach(([key, value]) => {
            this.writeValueInCard(WEATHER_CARD_TEMPLATE, key, value, 's');
          });
        }
        WEATHER_CARD_TEMPLATE[
          WEATHER_CARD_TEMPLATE.findIndex((item) => item.key === 'visibility')
        ].value = weatherData.visibility;
        WEATHER_CARD_TEMPLATE[
          WEATHER_CARD_TEMPLATE.findIndex((item) => item.key === 'all')
        ].value = weatherData.clouds.all;
        this.currentWeather = this.clearEmptyCards(WEATHER_CARD_TEMPLATE);
      });

    this.store
      .select(selectAirPollution)
      .pipe(untilDestroyed(this), filter(Boolean))
      .subscribe((airPollution) => {
        const airPollutionData = cloneDeep(airPollution);
        airPollutionData.date = new Date(airPollutionData.list[0].dt * 1000);
        Object.entries(airPollutionData.list[0].components).forEach(
          ([key, value]) => {
            this.writeValueInCard(AIR_POLLUTION_CARD_TEMPLATE, key, value);
          }
        );
        this.airComponents = AIR_POLLUTION_CARD_TEMPLATE;
        this.airPollution = airPollutionData;
      });
  }
}
