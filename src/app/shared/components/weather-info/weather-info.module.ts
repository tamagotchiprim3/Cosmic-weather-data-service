import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AirWeatherCardModule } from '../air-weather-card/air-weather-card.module';
import { MapWeatherCardModule } from '../map-weather-card/map-weather-card.module';
import { WeatherCardModule } from '../weather-card/weather-card.module';
import { WeatherInfoComponent } from './weather-info.component';

@NgModule({
  declarations: [WeatherInfoComponent],
  imports: [
    CommonModule,
    WeatherCardModule,
    AirWeatherCardModule,
    MapWeatherCardModule,
  ],
  exports: [WeatherInfoComponent],
})
export class WeatherInfoModule {}
