import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherCardComponent } from './weather-card.component';

@NgModule({
  declarations: [WeatherCardComponent],
  imports: [CommonModule],
  exports: [WeatherCardComponent],
})
export class WeatherCardModule {}
