import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForecastsWeatherComponent } from './pages/forecasts-weather.component';

const routes: Routes = [
  {
    path: '',
    component: ForecastsWeatherComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForecastsWeatherRoutingModule {}
