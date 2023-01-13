import { createReducer, on } from '@ngrx/store';
import { cloneDeep } from 'lodash';
import {
  AIR_POLLUTION_CARD_TEMPLATE,
  WEATHER_CARD_TEMPLATE,
} from 'src/app/shared/constants/weather-card-temp.const';
import {
  IGeocodingByCityResponse,
  IGeocodingByZipResponse,
} from 'src/app/shared/interfaces/geocoding.interface';
import {
  IAirPollutionResponse,
  IGetCurrentWeatherResponse,
  ILocation,
  IWeatherCard,
} from 'src/app/shared/interfaces/weather.interface';
import { clearEmptyCards } from 'src/app/shared/utils/clear-empty-cards';
import { writeValueInCard } from 'src/app/shared/utils/write-value-in-card';
import {
  geocodingByCitySuccessed,
  geocodingByZipSuccessed,
  getAirPollutionSuccessed,
  getCurrentWeatherSuccessed,
  writeCurrentPosition,
} from './current-weather.actions';

export interface ICurrentState {
  locationByCity: IGeocodingByCityResponse;
  locationByZip: IGeocodingByZipResponse;
  latitude: number;
  longitude: number;
  weatherDescription: string;
  location: ILocation;
  weatherCards: IWeatherCard[];
}

const initialState: ICurrentState = {
  locationByCity: null,
  locationByZip: null,
  latitude: null,
  longitude: null,
  weatherDescription: null,
  location: null,
  weatherCards: null,
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
    const weatherData: IGetCurrentWeatherResponse = cloneDeep(data);
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
    console.log(clearEmptyCards(WEATHER_CARD_TEMPLATE));
    return {
      ...state,
      latitude: data.coord.lat,
      longitude: data.coord.lon,
      weatherDescription: data.weather[0].main,
      location: {
        name: data.name,
        timezone: '+' + data.timezone / 3600 + ' UTC',
        latitude: data.coord.lat,
        longitude: data.coord.lon,
      },
      weatherCards: clearEmptyCards(WEATHER_CARD_TEMPLATE),
    };
  }),

  on(getAirPollutionSuccessed, (state, { data }) => {
    const airPollutionData: IAirPollutionResponse = cloneDeep(data);
    airPollutionData.date = new Date(airPollutionData.list[0].dt * 1000);
    Object.entries(airPollutionData.list[0].components).forEach(
      ([key, value]) => {
        writeValueInCard(AIR_POLLUTION_CARD_TEMPLATE, key, value);
      }
    );
    const weatherCards: IWeatherCard[] = cloneDeep(state.weatherCards);

    weatherCards.push({
      label: 'Air pollution',
      value: {
        index: airPollutionData.list[0].main.aqi,
        date: airPollutionData.date,
        components: AIR_POLLUTION_CARD_TEMPLATE,
      },
    });
    return {
      ...state,
      weatherCards: weatherCards,
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
