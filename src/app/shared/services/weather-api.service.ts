import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IGetCurrentWeatherResponse } from '../interfaces/weather.interface';

@Injectable({
  providedIn: 'root',
})
export class WeatherApiService {
  public endPoints = {
    currentWeather: 'https://api.openweathermap.org/data/2.5/weather',
  };

  constructor(private http: HttpClient) {}

  public getCurrentWeather(
    lat: number,
    lon: number
  ): Observable<IGetCurrentWeatherResponse> {
    return this.http.get<IGetCurrentWeatherResponse>(
      this.endPoints.currentWeather,
      {
        params: {
          lat: lat,
          lon: lon,
        },
      }
    );
  }
}
