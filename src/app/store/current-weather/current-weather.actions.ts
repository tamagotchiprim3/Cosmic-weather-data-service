import { createAction, props } from '@ngrx/store';
import {
  IGeocodingByCityResponse,
  IGeocodingByZipResponse,
} from 'src/app/shared/interfaces/geocoding.interface';
import {
  IAirPollutionResponse,
  IGetCurrentWeather,
  IGetCurrentWeatherResponse,
} from 'src/app/shared/interfaces/weather.interface';

export const geocodingByCity = createAction(
  '[Current weather] geocoding by city',
  props<{ data: string }>()
);

export const geocodingByCitySuccessed = createAction(
  '[Current weather] geocoding by city successed',
  props<{ data: IGeocodingByCityResponse }>()
);

export const geocodingByZip = createAction(
  '[Current weather] geocoding by zip',
  props<{ data: number }>()
);

export const geocodingByZipSuccessed = createAction(
  '[Current weather] geocoding by zip successed',
  props<{ data: IGeocodingByZipResponse }>()
);

export const getCurrentWeather = createAction(
  '[Current weather] get current weather',
  props<{ data: IGetCurrentWeather }>()
);

export const getCurrentWeatherSuccessed = createAction(
  '[Current weather] get current weather successed',
  props<{ data: IGetCurrentWeatherResponse }>()
);

export const getAirPollution = createAction(
  '[Current weather] get air pollution',
  props<{ data: IGetCurrentWeather }>()
);

export const getAirPollutionSuccessed = createAction(
  '[Current weather] get air pollution successed',
  props<{ data: IAirPollutionResponse }>()
);

export const writeCurrentPosition = createAction(
  '[Current weather] write current position',
  props<{ data: IGetCurrentWeather }>()
);
