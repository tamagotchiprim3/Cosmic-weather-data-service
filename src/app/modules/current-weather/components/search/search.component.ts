import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IWeatherCard } from 'src/app/shared/interfaces/weather.interface';
import { filteredCards } from 'src/app/store/weather/current-weather.actions';
import { selectWeatherCards } from 'src/app/store/weather/weather.selectors';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent implements OnInit {
  public searchControl: FormControl = new FormControl([]);
  public weatherCards: IWeatherCard[];

  constructor(private store: Store) {
    this.store.select(selectWeatherCards).subscribe((weather) => {
      this.weatherCards = weather[0];
    });
  }

  ngOnInit(): void {
    this.searchControl.valueChanges.subscribe((value: IWeatherCard[]) => {
      console.log('value: ', value);

      this.store.dispatch(filteredCards({ data: value }));
    });
  }
}
