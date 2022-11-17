import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistoryWeatherRoutingModule } from './history-weather-routing.module';
import { HistoryWeatherComponent } from './pages/history-weather.component';

@NgModule({
  declarations: [HistoryWeatherComponent],
  imports: [CommonModule, HistoryWeatherRoutingModule],
})
export class HistoryWeatherModule {}
