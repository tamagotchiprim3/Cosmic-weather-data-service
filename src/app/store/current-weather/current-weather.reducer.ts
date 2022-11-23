import { createReducer, on } from '@ngrx/store';
import {
  IGeocodingByCityResponse,
  IGeocodingByZipResponse,
} from 'src/app/shared/interfaces/geocoding.interface';
import {
  IAirPollutionResponse,
  IGetCurrentWeatherResponse,
} from 'src/app/shared/interfaces/weather.interface';
import {
  geocodingByCitySuccessed,
  geocodingByZipSuccessed,
  getAirPollutionSuccessed,
  getCurrentWeatherSuccessed,
} from './current-weather.actions';

export interface ICurrentState {
  locationByCity: IGeocodingByCityResponse;
  locationByZip: IGeocodingByZipResponse;
  weather: IGetCurrentWeatherResponse;
  airPollution: IAirPollutionResponse;
}

const initialState: ICurrentState = {
  locationByCity: null,
  locationByZip: null,
  weather: null,
  airPollution: null,
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
  }),
  on(getAirPollutionSuccessed, (state, { data }) => {
    return {
      ...state,
      airPollution: data,
    };
  })
);
