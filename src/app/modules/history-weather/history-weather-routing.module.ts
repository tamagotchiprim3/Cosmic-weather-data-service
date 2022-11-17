import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoryWeatherComponent } from './pages/history-weather.component';

const routes: Routes = [
  {
    path: '',
    component: HistoryWeatherComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistoryWeatherRoutingModule {}
