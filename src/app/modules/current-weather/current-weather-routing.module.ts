import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrentWeatherComponent } from './pages/current-weather.component';

const routes: Routes = [
  {
    path: '',
    component: CurrentWeatherComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CurrentWeatherRoutingModule {}
