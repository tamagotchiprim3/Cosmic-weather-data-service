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
  IHourForecast,
  ILocation,
  IWeatherCard,
  IWeatherDesc,
} from 'src/app/shared/interfaces/weather.interface';
import { clearEmptyCards } from 'src/app/shared/utils/clear-empty-cards';
import { writeValueInCard } from 'src/app/shared/utils/write-value-in-card';
import {
  filteredCards,
  geocodingByCitySuccessed,
  geocodingByZipSuccessed,
  getAirPollutionSuccessed,
  getCurrentWeatherSuccessed,
  getHourlyForecastSuccessed,
  writeCurrentPosition,
  writeMapCard,
} from './current-weather.actions';

export interface ICurrentState {
  locationByCity: IGeocodingByCityResponse;
  locationByZip: IGeocodingByZipResponse;
  latitude: number;
  longitude: number;
  weatherDescription: IWeatherDesc;
  location: ILocation;
  hourlyForecast: IHourForecast[];
  weatherCards: IWeatherCard[];
  filteredCards: IWeatherCard[];
}

const initialState: ICurrentState = {
  locationByCity: null,
  locationByZip: null,
  latitude: null,
  longitude: null,
  weatherDescription: null,
  location: null,
  hourlyForecast: null,
  weatherCards: null,
  filteredCards: null,
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
    const weatherCardsTemp = [...WEATHER_CARD_TEMPLATE];
    if (!weatherData) {
      return null;
    }
    if (weatherData.main) {
      Object.entries(weatherData.main).forEach(([key, value]) => {
        writeValueInCard(weatherCardsTemp, key, value);
      });
    }
    if (weatherData.wind) {
      Object.entries(weatherData.wind).forEach(([key, value]) => {
        writeValueInCard(weatherCardsTemp, key, value);
      });
    }
    if (weatherData.rain) {
      Object.entries(weatherData.rain).forEach(([key, value]) => {
        writeValueInCard(weatherCardsTemp, key, value, 'r');
      });
    }
    if (weatherData.snow) {
      Object.entries(weatherData.snow).forEach(([key, value]) => {
        writeValueInCard(weatherCardsTemp, key, value, 's');
      });
    }
    const visibilityIndex = weatherCardsTemp.findIndex(
      (item) => item.key === 'visibility'
    );

    weatherCardsTemp[visibilityIndex] = {
      ...weatherCardsTemp[visibilityIndex],
      value: weatherData.visibility,
    };
    const cloudsIndex = weatherCardsTemp.findIndex(
      (item) => item.key === 'all'
    );
    weatherCardsTemp[cloudsIndex] = {
      ...weatherCardsTemp[cloudsIndex],
      value: weatherData.clouds.all,
    };
    return {
      ...state,
      weatherDescription: data.weather[0],
      latitude: data.coord.lat,
      longitude: data.coord.lon,
      location: {
        name: data.name,
        timezone: '+' + data.timezone / 3600 + ' UTC',
        latitude: data.coord.lat,
        longitude: data.coord.lon,
      },
      weatherCards: [
        state?.weatherCards?.find((item) => item.label === 'Map'),
        ...clearEmptyCards(weatherCardsTemp),
      ],
    };
  }),

  on(getAirPollutionSuccessed, (state, { data }) => {
    const airPollutionData: IAirPollutionResponse = cloneDeep(data);
    airPollutionData.date = new Date(airPollutionData.list[0].dt * 1000);
    let airCardTemplate = [...AIR_POLLUTION_CARD_TEMPLATE];
    Object.entries(airPollutionData.list[0].components).forEach(
      ([key, value]) => {
        writeValueInCard(airCardTemplate, key, value);
      }
    );
    const weatherCards: IWeatherCard[] = cloneDeep(state.weatherCards);

    weatherCards.push({
      label: 'Air pollution',
      value: {
        index: airPollutionData.list[0].main.aqi,
        date: airPollutionData.date,
        components: airCardTemplate,
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
  }),
  on(filteredCards, (state, { data }) => {
    const weatherCards: IWeatherCard[] = [...state.weatherCards];
    const newValues: IWeatherCard[] = [...data];
    return {
      ...state,
      filteredCards: newValues,
    };
  }),
  on(writeMapCard, (state, { data }) => {
    let weatherCards: IWeatherCard[] = state.weatherCards || [];
    if (
      !state.weatherCards ||
      !state.weatherCards.find((item) => item.label === data.label)
    ) {
      weatherCards = [...weatherCards, data];
    }

    return {
      ...state,
      weatherCards: weatherCards,
    };
  }),
  on(getHourlyForecastSuccessed, (state, { data }) => {
    return {
      ...state,
      hourlyForecast: data.list,
    };
  })
);
