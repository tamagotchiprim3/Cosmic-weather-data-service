import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { AutocompleteInputModule } from 'src/app/shared/components/controls/autocomplete-input/autocomplete-input.module';
import { InputModule } from 'src/app/shared/components/controls/input/input.module';
import { SearchInputModule } from 'src/app/shared/components/controls/search-input/search-input.module';
import { AirWeatherCardComponent } from './components/air-weather-card/air-weather-card.component';
import { LocationComponent } from './components/location/location.component';
import { MapWeatherCardComponent } from './components/map-weather-card/map-weather-card.component';
import { SearchComponent } from './components/search/search.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { WeatherCardComponent } from './components/weather-card/weather-card.component';
import { WeatherInfoComponent } from './components/weather-info/weather-info.component';
import { CurrentWeatherRoutingModule } from './current-weather-routing.module';
import { CurrentWeatherComponent } from './pages/current-weather.component';

@NgModule({
  declarations: [
    CurrentWeatherComponent,
    SideBarComponent,
    LocationComponent,
    WeatherInfoComponent,
    SearchComponent,
    WeatherCardComponent,
    MapWeatherCardComponent,
    AirWeatherCardComponent,
  ],
  imports: [
    CommonModule,
    CurrentWeatherRoutingModule,
    ReactiveFormsModule,
    AutocompleteInputModule,
    InputModule,
    SearchInputModule,
    MatDividerModule,
  ],
})
export class CurrentWeatherModule {}
