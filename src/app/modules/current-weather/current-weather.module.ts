import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LocationModule } from 'src/app/shared/components/location/location.module';
import { SearchModule } from 'src/app/shared/components/search/search.module';
import { SideBarModule } from 'src/app/shared/components/side-bar/side-bar.module';
import { WeatherInfoModule } from 'src/app/shared/components/weather-info/weather-info.module';
import { CurrentWeatherRoutingModule } from './current-weather-routing.module';
import { CurrentWeatherComponent } from './pages/current-weather.component';

@NgModule({
  declarations: [CurrentWeatherComponent],
  imports: [
    CommonModule,
    CurrentWeatherRoutingModule,
    LocationModule,
    SearchModule,
    SideBarModule,
    WeatherInfoModule,
  ],
})
export class CurrentWeatherModule {}
