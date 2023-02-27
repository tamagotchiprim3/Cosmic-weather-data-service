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
} from 'src/app/store/weather/weather.selectors';
import { IWeatherCard } from '../../../../shared/interfaces/weather.interface';

@Component({
  selector: 'app-weather-info',
  templateUrl: './weather-info.component.html',
  styleUrls: ['./weather-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
@UntilDestroy()
export class WeatherInfoComponent implements OnInit {
  public airQualityValues: string[] = [
    'Good',
    'Fair',
    'Moderate',
    'Poor',
    'Very poor',
  ];
  public currentWeather: IWeatherCard[];
  public airPollution: IWeatherCard;
  public lat: number;
  public lon: number;
  public mapVisibility: boolean = true;

  constructor(private store: Store, private cdR: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.store
      .select(selectWeatherCards)
      .pipe(untilDestroyed(this))
      .subscribe((weather) => {
        this.currentWeather = [];
        this.airPollution = null;
        if (weather) {
          const weatherCards: IWeatherCard[] = cloneDeep(weather[0]);
          const filteredCards: IWeatherCard[] = cloneDeep(weather[1]);
          if (filteredCards && filteredCards.length > 0) {
            this.mapVisibility = filteredCards.find(
              (item) => item.label === 'Map'
            )
              ? true
              : false;
            filteredCards.forEach((element) => {
              if (element.label === 'Air pollution') {
                this.airPollution = { ...element };
                this.airPollution.value.index =
                  this.airQualityValues[this.airPollution?.value?.index];
                console.log('this.airPollution: ', this.airPollution);
              }
              if (
                element.label !== 'Map' &&
                element.label !== 'Air pollution'
              ) {
                this.currentWeather.push(element);
              }
            });
          } else {
            this.mapVisibility = true;
            if (weatherCards) {
              weatherCards.forEach((element) => {
                if (element.label === 'Air pollution') {
                  this.airPollution = element;
                  this.airPollution.value.index =
                    this.airQualityValues[this.airPollution?.value?.index];

                  console.log('this.airPollution: ', this.airPollution);
                }
                if (
                  element.label !== 'Map' &&
                  element.label !== 'Air pollution'
                ) {
                  this.currentWeather.push(element);
                }
              });
            }
          }

          this.cdR.markForCheck();
        }
      });

    this.store.select(selectLatitude).subscribe((lat: number) => {
      console.log('lat: ', lat);
      this.lat = lat;
      this.cdR.markForCheck();
    });

    this.store.select(selectLongitude).subscribe((lon: number) => {
      this.lon = lon;
      this.cdR.markForCheck();
    });
  }
}
