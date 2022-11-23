import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  IAirComponents,
  IWeatherCard,
} from '../../interfaces/weather.interface';

@Component({
  selector: 'app-air-weather-card',
  templateUrl: './air-weather-card.component.html',
  styleUrls: ['./air-weather-card.component.scss'],
})
export class AirWeatherCardComponent implements OnInit {
  @Input() public airIndex: number;
  @Input() public date: Date;
  @Input() public components: IWeatherCard[];

  constructor() {}

  ngOnInit(): void {}
}
