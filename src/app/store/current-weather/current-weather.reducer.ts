import { createReducer, on } from '@ngrx/store';
import {
  IGeocodingByCityResponse,
  IGeocodingByZipResponse,
} from 'src/app/shared/interfaces/geocoding.interface';
import { IGetCurrentWeatherResponse } from 'src/app/shared/interfaces/weather.interface';
import {
  geocodingByCitySuccessed,
  geocodingByZipSuccessed,
  getCurrentWeatherSuccessed,
} from './current-weather.actions';

export interface ICurrentState {
  locationByCity: IGeocodingByCityResponse[];
  locationByZip: IGeocodingByZipResponse;
  weather: IGetCurrentWeatherResponse;
}

const initialState: ICurrentState = {
  locationByCity: null,
  locationByZip: null,
  weather: null,
};

export const currentWeatherReducer = createReducer(
  initialState,
  on(geocodingByCitySuccessed, (state, { data }) => {
    return {
      ...state,
      locationByCity: data,
    };
  }),
  on(geocodingByZipSuccessed, (state, { data }) => {
    return {
      ...state,
      locationByZip: data,
    };
  }),
  on(getCurrentWeatherSuccessed, (state, { data }) => {
    return {
      ...state,
      weather: data,
    };
  })
);
