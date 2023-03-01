import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IWeatherCard } from 'src/app/shared/interfaces/weather.interface';

@Component({
  selector: 'app-air-weather-card',
  templateUrl: './air-weather-card.component.html',
  styleUrls: ['./air-weather-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AirWeatherCardComponent {
  @Input() public data: IWeatherCard;

  constructor() {}
  public trackByFn(index: any, item: any): any {
    return index;
  }
}
