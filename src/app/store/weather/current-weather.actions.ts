import { createAction, props } from '@ngrx/store';
import {
  IGeocodingByCityResponse,
  IGeocodingByZipResponse,
} from 'src/app/shared/interfaces/geocoding.interface';
import {
  IAirPollutionResponse,
  IGetCurrentWeatherResponse,
  IGetWeather,
  IHourlyForecastResponse,
  IWeatherCard,
} from 'src/app/shared/interfaces/weather.interface';

export const geocodingByCity = createAction(
  '[Weather] geocoding by city',
  props<{ data: string }>()
);

export const geocodingByCitySuccessed = createAction(
  '[Weather] geocoding by city successed',
  props<{ data: IGeocodingByCityResponse }>()
);

export const geocodingByZip = createAction(
  '[Weather] geocoding by zip',
  props<{ data: number }>()
);

export const geocodingByZipSuccessed = createAction(
  '[Weather] geocoding by zip successed',
  props<{ data: IGeocodingByZipResponse }>()
);

export const getCurrentWeather = createAction(
  '[Weather] get Weather',
  props<{ data: IGetWeather }>()
);

export const getCurrentWeatherSuccessed = createAction(
  '[Weather] get Weather successed',
  props<{ data: IGetCurrentWeatherResponse }>()
);

export const getAirPollution = createAction(
  '[Weather] get air pollution',
  props<{ data: IGetWeather }>()
);

export const getAirPollutionSuccessed = createAction(
  '[Weather] get air pollution successed',
  props<{ data: IAirPollutionResponse }>()
);

export const writeCurrentPosition = createAction(
  '[Weather] write current position',
  props<{ data: IGetWeather }>()
);

export const filteredCards = createAction(
  '[Weather] filter cards',
  props<{ data: IWeatherCard[] }>()
);

export const writeMapCard = createAction(
  '[Weather] write map card',
  props<{ data: IWeatherCard }>()
);

export const getHourlyForecast = createAction(
  '[Weather] get hourly Forecast',
  props<{ data: IGetWeather }>()
);

export const getHourlyForecastSuccessed = createAction(
  '[Weather] get hourly Forecast successed',
  props<{ data: IHourlyForecastResponse }>()
);
