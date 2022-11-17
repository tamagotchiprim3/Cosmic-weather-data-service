import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, map, mergeMap, switchMap } from 'rxjs';
import { GeocodingApiService } from 'src/app/shared/services/geocoding-api.service';
import { WeatherApiService } from 'src/app/shared/services/weather-api.service';
import {
  geocodingByCity,
  geocodingByCitySuccessed,
  geocodingByZip,
  geocodingByZipSuccessed,
  getCurrentWeather,
  getCurrentWeatherSuccessed,
} from './current-weather.actions';

@Injectable()
export class CurrentWeatherEffect {
  public geocodingByCityEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(geocodingByCity),
      mergeMap((action) =>
        this.geocodingService.getCoordinatesByCity(action.data).pipe(
          switchMap((data) => [
            geocodingByCitySuccessed({ data: data }),
            getCurrentWeather({
              data: {
                lat: data[0].lat,
                lon: data[0].lon,
              },
            }),
          ]),
          catchError(() => EMPTY)
        )
      )
    );
  });

  public geocodingByZipEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(geocodingByZip),
      mergeMap((action) =>
        this.geocodingService.getCoordinatesByZip(action.data).pipe(
          switchMap((data) => [
            geocodingByZipSuccessed({ data: data }),
            getCurrentWeather({
              data: {
                lat: data.lat,
                lon: data.lon,
              },
            }),
          ]),
          catchError(() => EMPTY)
        )
      )
    );
  });

  public getCurrentWeatherEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getCurrentWeather),
      mergeMap((action) =>
        this.weatherService
          .getCurrentWeather(action.data.lat, action.data.lon)
          .pipe(
            map((data) => getCurrentWeatherSuccessed({ data: data })),
            catchError(() => EMPTY)
          )
      )
    );
  });
  constructor(
    private actions$: Actions,
    private geocodingService: GeocodingApiService,
    private weatherService: WeatherApiService
  ) {}
}
