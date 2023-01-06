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
  selectWeatherCards,
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
      .select(selectWeatherCards)
      .pipe(untilDestroyed(this))
      .subscribe((weather) => {
        if (weather) {
          this.currentWeather = weather;
          this.cdR.markForCheck();
        }
      });

    this.store
      .select(selectAirPollution)
      .pipe(untilDestroyed(this), filter(Boolean))
      .subscribe((airPollution) => {
        this.airComponents = airPollution[0] as IWeatherCard[];
        this.airPollution = airPollution[1] as IAirPollutionResponse;
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
