import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapWeatherCardComponent } from './map-weather-card.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

@NgModule({
  declarations: [MapWeatherCardComponent],
  imports: [CommonModule, LeafletModule],
  exports: [MapWeatherCardComponent],
})
export class MapWeatherCardModule {}
