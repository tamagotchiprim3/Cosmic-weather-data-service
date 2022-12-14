import { ActionReducerMap } from '@ngrx/store';
import { CurrentWeatherEffect } from './current-weather/current-weather.effects';
import {
  currentWeatherReducer,
  ICurrentState,
} from './current-weather/current-weather.reducer';

export interface ICoreState {
  currentWeather: ICurrentState;
}

export const reducers: ActionReducerMap<any> = {
  currentWeather: currentWeatherReducer,
};

export const effects: any[] = [CurrentWeatherEffect];
