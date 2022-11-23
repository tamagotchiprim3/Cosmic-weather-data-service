import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ICurrentState } from './current-weather.reducer';

export const currentWeatherStore =
  createFeatureSelector<ICurrentState>('currentWeather');

export const getLocationSelect = (state: ICurrentState) => {
  return state.weather?.name;
};

export const selectLocation = createSelector(
  currentWeatherStore,
  getLocationSelect
);

export const getTimezoneSelect = (state: ICurrentState) => {
  return state.weather?.timezone;
};

export const selectTimezone = createSelector(
  currentWeatherStore,
  getTimezoneSelect
);

export const getLatitudeSelect = (state: ICurrentState) => {
  return state.weather?.coord.lat;
};

export const selectLatitude = createSelector(
  currentWeatherStore,
  getLatitudeSelect
);

export const getLongitudeSelect = (state: ICurrentState) => {
  return state.weather?.coord.lon;
};

export const selectLongitude = createSelector(
  currentWeatherStore,
  getLongitudeSelect
);

export const getCurrentWeatherSelect = (state: ICurrentState) => {
  return state?.weather;
};

export const selectCurrentWeather = createSelector(
  currentWeatherStore,
  getCurrentWeatherSelect
);

export const getAirPollutionSelect = (state: ICurrentState) => {
  return state?.airPollution;
};

export const selectAirPollution = createSelector(
  currentWeatherStore,
  getAirPollutionSelect
);
