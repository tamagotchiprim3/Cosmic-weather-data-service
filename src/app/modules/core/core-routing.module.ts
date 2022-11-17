import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  CORE_PATH,
  CURRENT_WEATHER_PATH,
  FORECASTS_WEATHER_PATH,
  HISTORY_WEATHER_PATH,
} from 'src/app/shared/constants/routing.const';
import { CoreComponent } from './pages/core.component';

const routes: Routes = [
  {
    path: '',
    component: CoreComponent,
    children: [
      {
        path: CURRENT_WEATHER_PATH.path,
        loadChildren: () =>
          import('./../current-weather/current-weather.module').then(
            (m) => m.CurrentWeatherModule
          ),
      },
      {
        path: HISTORY_WEATHER_PATH.path,
        loadChildren: () =>
          import('./../history-weather/history-weather.module').then(
            (m) => m.HistoryWeatherModule
          ),
      },
      {
        path: FORECASTS_WEATHER_PATH.path,
        loadChildren: () =>
          import('./../forecasts-weather/forecasts-weather.module').then(
            (m) => m.ForecastsWeatherModule
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: CURRENT_WEATHER_PATH.path,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule {}
