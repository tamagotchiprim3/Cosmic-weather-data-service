import { createFeatureSelector, createSelector } from '@ngrx/store';
import { cloneDeep } from 'lodash';
import {
  AIR_POLLUTION_CARD_TEMPLATE,
  WEATHER_CARD_TEMPLATE,
} from 'src/app/shared/constants/weather-card-temp.const';
import {
  IAirPollutionResponse,
  IGetCurrentWeatherResponse,
  IWeatherCard,
} from 'src/app/shared/interfaces/weather.interface';
import { clearEmptyCards } from 'src/app/shared/utils/clear-empty-cards';
import { writeValueInCard } from 'src/app/shared/utils/write-value-in-card';
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

export const getCurrentWeatherSelect = (state: ICurrentState) => {
  return state?.weather;
};

export const selectCurrentWeather = createSelector(
  currentWeatherStore,
  getCurrentWeatherSelect
);

export const getAirPollutionSelect = (state: ICurrentState) => {
  let airPollutionData: IAirPollutionResponse = cloneDeep(state.airPollution);
  if (!airPollutionData) {
    return [];
  }
  airPollutionData.date = new Date(airPollutionData.list[0].dt * 1000);
  Object.entries(airPollutionData.list[0].components).forEach(
    ([key, value]) => {
      writeValueInCard(AIR_POLLUTION_CARD_TEMPLATE, key, value);
    }
  );
  return [AIR_POLLUTION_CARD_TEMPLATE, airPollutionData];
};

export const selectAirPollution = createSelector(
  currentWeatherStore,
  getAirPollutionSelect
);

export const getWeatherCards = (state: ICurrentState) => {
  let weatherData: IGetCurrentWeatherResponse = cloneDeep(state.weather);
  if (!weatherData) {
    return null;
  }
  if (weatherData.main) {
    Object.entries(weatherData.main).forEach(([key, value]) => {
      writeValueInCard(WEATHER_CARD_TEMPLATE, key, value);
    });
  }
  if (weatherData.wind) {
    Object.entries(weatherData.wind).forEach(([key, value]) => {
      writeValueInCard(WEATHER_CARD_TEMPLATE, key, value);
    });
  }
  if (weatherData.rain) {
    Object.entries(weatherData.rain).forEach(([key, value]) => {
      writeValueInCard(WEATHER_CARD_TEMPLATE, key, value, 'r');
    });
  }
  if (weatherData.snow) {
    Object.entries(weatherData.snow).forEach(([key, value]) => {
      writeValueInCard(WEATHER_CARD_TEMPLATE, key, value, 's');
    });
  }
  WEATHER_CARD_TEMPLATE[
    WEATHER_CARD_TEMPLATE.findIndex((item) => item.key === 'visibility')
  ].value = weatherData.visibility;
  WEATHER_CARD_TEMPLATE[
    WEATHER_CARD_TEMPLATE.findIndex((item) => item.key === 'all')
  ].value = weatherData.clouds.all;
  return clearEmptyCards(WEATHER_CARD_TEMPLATE);
};

export const selectWeatherCards = createSelector(
  currentWeatherStore,
  getWeatherCards
);
