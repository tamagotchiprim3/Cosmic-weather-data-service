import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  IAirPollutionResponse,
  IGetCurrentWeatherResponse,
  IHourlyForecastResponse,
  IMonthlyForecastResponse,
} from '../interfaces/weather.interface';

@Injectable({
  providedIn: 'root',
})
export class WeatherApiService {
  public endPoints = {
    currentWeather: 'https://api.openweathermap.org/data/2.5/weather',
    airPollution: 'http://api.openweathermap.org/data/2.5/air_pollution',
    currentWeatherMap: 'http://maps.openweathermap.org/maps/2.0/weather',
    forecast: 'https://pro.openweathermap.org/data/2.5/forecast/hourly',
    monthlyForecast: 'https://pro.openweathermap.org/data/2.5/forecast/climate',
  };

  constructor(private http: HttpClient) {}

  public getCurrentWeather(
    lat: number,
    lon: number,
    lang?: string
  ): Observable<IGetCurrentWeatherResponse> {
    return this.http.get<IGetCurrentWeatherResponse>(
      this.endPoints.currentWeather,
      {
        params: {
          lat: lat,
          lon: lon,
          units: 'metric',
          lang: lang,
        },
      }
    );
  }

  public getCurrentAirPollution(
    lat: number,
    lon: number,
    lang?: string
  ): Observable<IAirPollutionResponse> {
    return this.http.get<IAirPollutionResponse>(this.endPoints.airPollution, {
      params: {
        lat: lat,
        lon: lon,
        lang: lang,
      },
    });
  }
  public getHourlyForecast(
    lat: number,
    lon: number,
    lang?: string
  ): Observable<IHourlyForecastResponse> {
    return this.http.get<IHourlyForecastResponse>(this.endPoints.forecast, {
      params: {
        lat: lat,
        lon: lon,
        units: 'metric',
        lang: lang,
      },
    });
  }
  public getMonthlyForecast(
    lat: number,
    lon: number,
    lang?: string
  ): Observable<IMonthlyForecastResponse> {
    return this.http.get<IMonthlyForecastResponse>(
      this.endPoints.monthlyForecast,
      {
        params: {
          lat: lat,
          lon: lon,
          units: 'metric',
          lang: lang,
        },
      }
    );
  }
}
