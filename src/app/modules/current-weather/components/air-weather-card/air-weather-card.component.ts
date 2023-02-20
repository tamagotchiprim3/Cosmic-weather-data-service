import { Component, Input } from '@angular/core';
import { IWeatherCard } from 'src/app/shared/interfaces/weather.interface';

@Component({
  selector: 'app-air-weather-card',
  templateUrl: './air-weather-card.component.html',
  styleUrls: ['./air-weather-card.component.scss'],
})
export class AirWeatherCardComponent {
  @Input() public data: IWeatherCard;

  constructor() {}
}
