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
  writeCurrentPosition,
} from './current-weather.actions';

export interface ICurrentState {
  latitude: number;
  longitude: number;
  locationByCity: IGeocodingByCityResponse;
  locationByZip: IGeocodingByZipResponse;
  weather: IGetCurrentWeatherResponse;
  airPollution: IAirPollutionResponse;
}

const initialState: ICurrentState = {
  latitude: null,
  longitude: null,
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
      latitude: data.coord.lat,
      longitude: data.coord.lon,
      weather: data,
    };
  }),
  on(getAirPollutionSuccessed, (state, { data }) => {
    return {
      ...state,
      airPollution: data,
    };
  }),
  on(writeCurrentPosition, (state, { data }) => {
    return {
      ...state,
      longitude: data.lon,
      latitude: data.lat,
    };
  })
);
