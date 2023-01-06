import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectWeatherCards } from 'src/app/store/current-weather/current-weather.selectors';
@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrentWeatherComponent {
  constructor() {}
}
