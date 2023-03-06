import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
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
@UntilDestroy()
export class SearchComponent implements OnInit, OnDestroy {
  public searchControl: FormControl = new FormControl([]);
  public weatherCards: IWeatherCard[];

  constructor(private store: Store) {
    this.store
      .select(selectWeatherCards)
      .pipe(untilDestroyed(this))
      .subscribe((weather) => {
        this.weatherCards = weather[0];
      });
  }

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe((value: IWeatherCard[]) => {
        console.log('value: ', value);

        this.store.dispatch(filteredCards({ data: value }));
      });
  }
  ngOnDestroy(): void {}
}
