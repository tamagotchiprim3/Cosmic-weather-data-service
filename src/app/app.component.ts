import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Weather } from './shared/enum/weather-conditions.enum';
import { selectCurrentWeather } from './store/current-weather/current-weather.selectors';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public weatherPicture?: string;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.select(selectCurrentWeather).subscribe((weatherData) => {
      if (weatherData !== null) {
        this.weatherPicture =
          Weather[weatherData.weather[0].main as keyof typeof Weather];
      }
    });
  }
}
