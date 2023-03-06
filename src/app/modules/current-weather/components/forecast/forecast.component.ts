import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { cloneDeep } from 'lodash';
import { IHourForecast } from 'src/app/shared/interfaces/weather.interface';
import { selectHourlyForecast } from 'src/app/store/weather/weather.selectors';
import { ForecastDialogComponent } from '../forecast-dialog/forecast-dialog.component';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
@UntilDestroy()
export class ForecastComponent implements OnInit, OnDestroy {
  public forecastList?: IHourForecast[];
  public iconUrl?: string;
  constructor(
    private store: Store,
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.store
      .select(selectHourlyForecast)
      .pipe(untilDestroyed(this))
      .subscribe((data) => {
        if (data) {
          this.forecastList = cloneDeep(data).map((item) => {
            item.weather[0].icon = `../../../../../assets/weather-conditions/${item.weather[0].icon}.png`;
            return item;
          });
          this.cdr.markForCheck();
        }
      });
  }
  ngOnDestroy(): void {}

  public openDialog(item: IHourForecast): void {
    const dialogRef = this.dialog.open(ForecastDialogComponent, {
      data: item,
    });
  }
  public trackByFn(index: any, item: any): any {
    return index;
  }
}
