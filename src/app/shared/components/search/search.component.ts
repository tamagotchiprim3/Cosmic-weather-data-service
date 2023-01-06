import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectWeatherCards } from 'src/app/store/current-weather/current-weather.selectors';
import { IWeatherCard } from '../../interfaces/weather.interface';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  public searchControl: FormControl = new FormControl();
  public weatherCards: IWeatherCard[];

  constructor(private store: Store) {
    this.store.select(selectWeatherCards).subscribe((weather) => {
      this.weatherCards = weather;
    });
  }

  ngOnInit(): void {}
}
