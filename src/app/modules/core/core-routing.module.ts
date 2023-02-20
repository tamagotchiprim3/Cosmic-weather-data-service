import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WEATHER_PATH } from 'src/app/shared/constants/routing.const';
import { CoreComponent } from './pages/core.component';

const routes: Routes = [
  {
    path: '',
    component: CoreComponent,
    children: [
      {
        path: WEATHER_PATH.path,
        loadChildren: () =>
          import('./../current-weather/current-weather.module').then(
            (m) => m.CurrentWeatherModule
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: WEATHER_PATH.path,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule {}
