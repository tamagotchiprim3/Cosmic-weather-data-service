import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MAT_DIALOG_DEFAULT_OPTIONS,
} from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AutocompleteInputModule } from 'src/app/shared/components/controls/autocomplete-input/autocomplete-input.module';
import { InputModule } from 'src/app/shared/components/controls/input/input.module';
import { SearchInputModule } from 'src/app/shared/components/controls/search-input/search-input.module';
import { AirWeatherCardComponent } from './components/air-weather-card/air-weather-card.component';
import { CalendarDialogComponent } from './components/calendar-dialog/calendar-dialog.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { ForecastDialogComponent } from './components/forecast-dialog/forecast-dialog.component';
import { ForecastComponent } from './components/forecast/forecast.component';
import { LocationComponent } from './components/location/location.component';
import { MapWeatherCardComponent } from './components/map-weather-card/map-weather-card.component';
import { SearchComponent } from './components/search/search.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { WeatherCardComponent } from './components/weather-card/weather-card.component';
import { WeatherInfoComponent } from './components/weather-info/weather-info.component';
import { CurrentWeatherRoutingModule } from './current-weather-routing.module';
import { CurrentWeatherComponent } from './pages/current-weather.component';
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
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
    ForecastComponent,
    ForecastDialogComponent,
    CalendarComponent,
    CalendarDialogComponent,
  ],
  imports: [
    CommonModule,
    CurrentWeatherRoutingModule,
    ReactiveFormsModule,
    AutocompleteInputModule,
    InputModule,
    SearchInputModule,
    MatDividerModule,
    MatDialogModule,
    MatIconModule,
    TranslateModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} },
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: { width: '30%', height: '70%' },
    },
  ],
})
export class CurrentWeatherModule {}
