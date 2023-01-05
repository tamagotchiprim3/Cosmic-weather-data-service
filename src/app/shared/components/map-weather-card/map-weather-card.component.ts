import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import * as L from 'leaflet';
import { Map } from 'leaflet';
import { MAP_LAYERS } from '../../constants/map-layers.const';

@Component({
  selector: 'app-map-weather-card',
  templateUrl: './map-weather-card.component.html',
  styleUrls: ['./map-weather-card.component.scss'],
})
export class MapWeatherCardComponent implements OnChanges, OnDestroy {
  @Input() public lat: number;
  @Input() public lon: number;

  public map?: Map;

  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['lat'].currentValue && changes['lon'].currentValue) {
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
    }
  }

  ngOnDestroy(): void {}
}
