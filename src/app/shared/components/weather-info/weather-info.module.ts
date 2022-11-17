import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherInfoComponent } from './weather-info.component';

@NgModule({
  declarations: [WeatherInfoComponent],
  imports: [CommonModule],
  exports: [WeatherInfoComponent],
})
export class WeatherInfoModule {}
