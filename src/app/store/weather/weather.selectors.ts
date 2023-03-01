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
  return [state?.weatherCards, state.filteredCards];
};

export const selectWeatherCards = createSelector(
  currentWeatherStore,
  getWeatherCards
);

export const getHourlyForecast = (state: ICurrentState) => {
  return state?.hourlyForecast;
};

export const selectHourlyForecast = createSelector(
  currentWeatherStore,
  getHourlyForecast
);

export const getCurrentTemperature = (state: ICurrentState) => {
  return {
    location: state?.location?.name,
    icon: `../../../../../assets/weather-conditions/${state?.weatherDescription?.icon}.png`,
    temp: state?.weatherCards?.find((item) => item.key === 'temp')?.value,
  };
};
export const selectCurrentTemperature = createSelector(
  currentWeatherStore,
  getCurrentTemperature
);
export const getMonthlyForecast = (state: ICurrentState) => {
  return state?.monthlyForecast;
};
export const selectMonthlyForecast = createSelector(
  currentWeatherStore,
  getMonthlyForecast
);
export const getCurrentTheme = (state: ICurrentState) => {
  return state?.currentTheme;
};

export const selectCurrentTheme = createSelector(
  currentWeatherStore,
  getCurrentTheme
);
