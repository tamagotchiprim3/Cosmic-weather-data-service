import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AirWeatherCardComponent } from './air-weather-card.component';

@NgModule({
  declarations: [AirWeatherCardComponent],
  imports: [CommonModule],
  exports: [AirWeatherCardComponent],
})
export class AirWeatherCardModule {}
