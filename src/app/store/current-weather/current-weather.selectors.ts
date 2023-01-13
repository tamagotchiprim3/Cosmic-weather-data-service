import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ICurrentState } from './current-weather.reducer';

export const currentWeatherStore =
  createFeatureSelector<ICurrentState>('currentWeather');

export const getLatitudeSelect = (state: ICurrentState) => {
  return state.latitude;
};

export const selectLatitude = createSelector(
  currentWeatherStore,
  getLatitudeSelect
);

export const getLongitudeSelect = (state: ICurrentState) => {
  return state.longitude;
};

export const selectLongitude = createSelector(
  currentWeatherStore,
  getLongitudeSelect
);

export const getLocationSelect = (state: ICurrentState) => {
  return state.location;
};

export const selectLocation = createSelector(
  currentWeatherStore,
  getLocationSelect
);

export const getWeatherDescription = (state: ICurrentState) => {
  return state.weatherDescription;
};

export const selectWeatherDescription = createSelector(
  currentWeatherStore,
  getWeatherDescription
);

export const getWeatherCards = (state: ICurrentState) => {
  return state?.weatherCards;
};

export const selectWeatherCards = createSelector(
  currentWeatherStore,
  getWeatherCards
);
