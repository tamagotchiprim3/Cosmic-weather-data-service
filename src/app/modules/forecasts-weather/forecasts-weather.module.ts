import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForecastsWeatherRoutingModule } from './forecasts-weather-routing.module';
import { ForecastsWeatherComponent } from './pages/forecasts-weather.component';

@NgModule({
  declarations: [ForecastsWeatherComponent],
  imports: [CommonModule, ForecastsWeatherRoutingModule],
})
export class ForecastsWeatherModule {}
