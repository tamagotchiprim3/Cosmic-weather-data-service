import { ActionReducerMap } from '@ngrx/store';
import { appReducer, IAppState } from './app/app.reducer';
import { CurrentWeatherEffect } from './weather/current-weather.effects';
import {
  currentWeatherReducer,
  ICurrentState,
} from './weather/current-weather.reducer';

export interface ICoreState {
  app: IAppState;
  currentWeather: ICurrentState;
}

export const reducers: ActionReducerMap<any> = {
  app: appReducer,
  currentWeather: currentWeatherReducer,
};

export const effects: any[] = [CurrentWeatherEffect];
