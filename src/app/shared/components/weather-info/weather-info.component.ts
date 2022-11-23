import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  IAirPollutionResponse,
  IWeatherCard,
} from '../../interfaces/weather.interface';

@Component({
  selector: 'app-weather-info',
  templateUrl: './weather-info.component.html',
  styleUrls: ['./weather-info.component.scss'],
})
export class WeatherInfoComponent implements OnInit {
  @Input() public currentWeather: IWeatherCard[];
  @Input() public airPollution: IAirPollutionResponse;
  @Input() public airComponents: IWeatherCard[];
  @Input() public lat: number;
  @Input() public lon: number;

  constructor(private store: Store) {}

  ngOnInit(): void {}
}
