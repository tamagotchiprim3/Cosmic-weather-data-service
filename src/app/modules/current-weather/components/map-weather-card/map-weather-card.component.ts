import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import * as L from 'leaflet';
import { Map } from 'leaflet';
import { MAP_LAYERS } from 'src/app/shared/constants/map-layers.const';
import { writeMapCard } from 'src/app/store/weather/current-weather.actions';

@UntilDestroy()
@Component({
  selector: 'app-map-weather-card',
  templateUrl: './map-weather-card.component.html',
  styleUrls: ['./map-weather-card.component.scss'],
})
export class MapWeatherCardComponent implements OnChanges {
  @Input() public lat: number;
  @Input() public lon: number;

  public map?: Map;

  constructor(private store: Store) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['lat'] &&
      changes['lat'].currentValue &&
      changes['lon'] &&
      changes['lon'].currentValue
    ) {
      console.log('onChanges works');
      if (this.map) {
        this.map.off();
        this.map.remove();
      }
      this.map = L.map('map').setView([this.lat, this.lon], 13);

      const mainLayer = L.tileLayer(
        'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
          maxZoom: 20,
          opacity: 1,
          attribution:
            '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }
      ).addTo(this.map);

      const layersGroup = MAP_LAYERS;
      L.control.layers(layersGroup).addTo(this.map);
      this.store.dispatch(
        writeMapCard({
          data: {
            label: 'Map',
          },
        })
      );
    }
  }
}
