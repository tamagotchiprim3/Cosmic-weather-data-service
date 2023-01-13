import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { cloneDeep } from 'lodash';
import {
  selectLatitude,
  selectLongitude,
  selectWeatherCards,
} from 'src/app/store/current-weather/current-weather.selectors';
import { IWeatherCard } from '../../interfaces/weather.interface';

@Component({
  selector: 'app-weather-info',
  templateUrl: './weather-info.component.html',
  styleUrls: ['./weather-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
@UntilDestroy()
export class WeatherInfoComponent implements OnInit {
  public currentWeather: IWeatherCard[];
  public airPollution: IWeatherCard;
  public lat: number;
  public lon: number;

  constructor(private store: Store, private cdR: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.store
      .select(selectWeatherCards)
      .pipe(untilDestroyed(this))
      .subscribe((weather) => {
        if (weather) {
          const weatherCards = cloneDeep(weather);
          let airCard: IWeatherCard = weatherCards.find((card) => {
            return card.label === 'Air pollution';
          });
          this.airPollution = airCard;
          weatherCards.splice(
            weatherCards.findIndex((card) => {
              return card === airCard;
            }),
            1
          );
          this.currentWeather = weatherCards;
          this.cdR.markForCheck();
        }
      });

    this.store.select(selectLatitude).subscribe((lat: number) => {
      this.lat = lat;
      this.cdR.markForCheck();
    });

    this.store.select(selectLongitude).subscribe((lon: number) => {
      this.lon = lon;
      this.cdR.markForCheck();
    });
  }
}
