import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IGetWeather } from './shared/interfaces/weather.interface';
import { writeCurrentPosition } from './store/weather/current-weather.actions';
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
  public currentPosition: IGetWeather | null;

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
      },
      () => {
        this.currentPosition = null;
      }
    );
  }
}
