import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { cloneDeep } from 'lodash';
import { filter } from 'rxjs';
import {
  selectAirPollution,
  selectCurrentWeather,
  selectLatitude,
  selectLongitude,
} from 'src/app/store/current-weather/current-weather.selectors';
import {
  AIR_POLLUTION_CARD_TEMPLATE,
  WEATHER_CARD_TEMPLATE,
} from '../../constants/weather-card-temp.const';
import {
  IAirPollutionResponse,
  IWeatherCard,
} from '../../interfaces/weather.interface';

@Component({
  selector: 'app-weather-info',
  templateUrl: './weather-info.component.html',
  styleUrls: ['./weather-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
@UntilDestroy()
export class WeatherInfoComponent implements OnInit {
  public currentWeather: IWeatherCard[];
  public airPollution: IAirPollutionResponse;
  public airComponents: IWeatherCard[];
  public lat: number;
  public lon: number;

  constructor(private store: Store, private cdR: ChangeDetectorRef) {}

  ngOnInit(): void {
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
        this.cdR.markForCheck();
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
        this.cdR.markForCheck();
      });
    this.store
      .select(selectLatitude)
      .pipe(untilDestroyed(this))
      .subscribe((latitude) => {
        this.lat = latitude;
        this.cdR.markForCheck();
      });
    this.store
      .select(selectLongitude)
      .pipe(untilDestroyed(this))
      .subscribe((longtitude) => {
        this.lon = longtitude;
        this.cdR.markForCheck();
      });
  }

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
}
