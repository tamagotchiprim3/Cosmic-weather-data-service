import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { filterCards } from 'src/app/store/current-weather/current-weather.actions';
import { selectWeatherCards } from 'src/app/store/current-weather/current-weather.selectors';
import { IWeatherCard } from '../../interfaces/weather.interface';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  public searchControl: FormControl = new FormControl([]);
  public weatherCards: IWeatherCard[];

  constructor(private store: Store) {
    this.store.select(selectWeatherCards).subscribe((weather) => {
      this.weatherCards = weather[0];
      // console.log('this.weatherCards: ', this.weatherCards);
    });
  }

  ngOnInit(): void {
    this.searchControl.valueChanges.subscribe((value: IWeatherCard[]) => {
      console.log('value: ', value);

      this.store.dispatch(filterCards({ data: value }));
    });
  }
}
