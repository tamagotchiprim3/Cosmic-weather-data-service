import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  IAirPollutionResponse,
  IGetCurrentWeatherResponse,
} from '../interfaces/weather.interface';

@Injectable({
  providedIn: 'root',
})
export class WeatherApiService {
  public endPoints = {
    currentWeather: 'https://api.openweathermap.org/data/2.5/weather',
    airPollution: 'http://api.openweathermap.org/data/2.5/air_pollution',
    currentWeatherMap: 'http://maps.openweathermap.org/maps/2.0/weather',
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
          units: 'metric',
        },
      }
    );
  }

  public getCurrentAirPollution(
    lat: number,
    lon: number
  ): Observable<IAirPollutionResponse> {
    return this.http.get<IAirPollutionResponse>(this.endPoints.airPollution, {
      params: {
        lat: lat,
        lon: lon,
      },
    });
  }
}
