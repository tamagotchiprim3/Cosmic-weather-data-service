import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { cloneDeep } from 'lodash';
import { selectCurrentTemperature } from 'src/app/store/weather/weather.selectors';
@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrentWeatherComponent {
  public dataTemp?: { location: string; temp: number; icon: string };
  constructor(private store: Store) {
    store.select(selectCurrentTemperature).subscribe((data) => {
      this.dataTemp = cloneDeep(data);
    });
  }
}
