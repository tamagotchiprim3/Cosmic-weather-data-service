import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { thresholdSturges } from 'd3';
import { Observable } from 'rxjs';
import { Weather } from './shared/enum/weather-conditions.enum';
import { IGetCurrentWeather } from './shared/interfaces/weather.interface';
import { writeCurrentPosition } from './store/current-weather/current-weather.actions';
import { selectCurrentWeather } from './store/current-weather/current-weather.selectors';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  public weatherPicture: string;
  public currentPosition: IGetCurrentWeather | null;

  constructor(private store: Store) {}

  ngOnInit(): void {
    window.navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        this.currentPosition = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        };
        this.store.dispatch(
          writeCurrentPosition({ data: this.currentPosition })
        );
        console.log(this.currentPosition);
      },
      () => {
        this.currentPosition = null;
      }
    );

    this.store.select(selectCurrentWeather).subscribe((weatherData) => {
      if (weatherData !== null) {
        this.weatherPicture =
          Weather[weatherData.weather[0].main as keyof typeof Weather];
      }
    });
  }
}
