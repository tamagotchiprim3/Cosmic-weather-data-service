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
  filterCards,
  geocodingByCitySuccessed,
  geocodingByZipSuccessed,
  getAirPollutionSuccessed,
  getCurrentWeatherSuccessed,
  writeCurrentPosition,
  writeMapCard,
} from './current-weather.actions';

export interface ICurrentState {
  locationByCity: IGeocodingByCityResponse;
  locationByZip: IGeocodingByZipResponse;
  latitude: number;
  longitude: number;
  weatherDescription: string;
  location: ILocation;
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
      weatherDescription: data.weather[0].main,
      location: {
        name: data.name,
        timezone: '+' + data.timezone / 3600 + ' UTC',
        latitude: data.coord.lat,
        longitude: data.coord.lon,
      },
      weatherCards: [
        ...state.weatherCards,
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
  on(filterCards, (state, { data }) => {
    const weatherCards: IWeatherCard[] = [...state.weatherCards];
    const newValues: IWeatherCard[] = [...data];
    if (state.filteredCards && newValues.length < state.filteredCards.length) {
      newValues.forEach((item) => {
        if (state.filteredCards.find((element) => element.label !== item)) {
          weatherCards.push(item);
        }
      });
      console.log(weatherCards);
    } else {
      newValues.forEach((item) => {
        if (weatherCards.find((element) => element.label === item.label)) {
          weatherCards.splice(
            weatherCards.findIndex((element) => element.label === item.label),
            1
          );
        }
      });
    }
    return {
      ...state,
      weatherCards: weatherCards,
      filteredCards: newValues,
    };
  }),
  on(writeMapCard, (state, { data }) => {
    if (state.weatherCards) {
      const weatherCards: IWeatherCard[] = [...state.weatherCards];
      if (
        weatherCards.find((item) => item.label !== 'Map') &&
        state.filteredCards.find((item) => item.label !== 'Map')
      ) {
        weatherCards.push(data);
      }
      return {
        ...state,
        weatherCards: weatherCards,
      };
    } else {
      const weatherCards: IWeatherCard[] = [];
      weatherCards.push(data);
      return {
        ...state,
        weatherCards: weatherCards,
      };
    }
  })
);
