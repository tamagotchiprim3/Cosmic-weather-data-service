import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { cloneDeep } from 'lodash';
import { IHourForecast } from 'src/app/shared/interfaces/weather.interface';
import { selectHourlyForecast } from 'src/app/store/weather/weather.selectors';
import { ForecastDialogComponent } from '../forecast-dialog/forecast-dialog.component';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss'],
})
export class ForecastComponent implements OnInit {
  public forecastList?: IHourForecast[];
  public iconUrl?: string;
  constructor(private store: Store, public dialog: MatDialog) {}
  ngOnInit(): void {
    this.store.select(selectHourlyForecast).subscribe((data) => {
      if (data) {
        this.forecastList = cloneDeep(data).map((item) => {
          item.weather[0].icon = `../../../../../assets/weather-conditions/${item.weather[0].icon}.png`;
          return item;
        });
        console.log('this.forecastList: ', this.forecastList);
      }
    });
  }

  public openDialog(item: IHourForecast): void {
    const dialogRef = this.dialog.open(ForecastDialogComponent, {
      data: item,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
