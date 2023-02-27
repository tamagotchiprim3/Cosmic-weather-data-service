import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { cloneDeep } from 'lodash';
import {
  ICalendarDay,
  IMonthlyForecastResponse,
} from 'src/app/shared/interfaces/weather.interface';
import { selectMonthlyForecast } from 'src/app/store/weather/weather.selectors';
import { CalendarDialogComponent } from '../calendar-dialog/calendar-dialog.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent {
  public calendarData?: IMonthlyForecastResponse;
  public daysOfTheWeek: string[] = [
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
    'Sun',
  ];
  constructor(private store: Store, public dialog: MatDialog) {
    store.select(selectMonthlyForecast).subscribe((data) => {
      this.calendarData = cloneDeep(data);
      this.calendarData?.list.map((item) => {
        item.weather[0].icon = `../../../../../assets/weather-conditions/${item.weather[0].icon}.png`;
        return item;
      });
      let dayIndex = this.calendarData?.list[0]?.dt_txt.getDay();
      if (dayIndex === 0) {
        dayIndex = 7;
      }
      for (let i = 1; i < dayIndex; i++) {
        this.calendarData.list.unshift(null);
        console.log('this.calendarData: ', this.calendarData);
      }
    });
  }

  public openDialog(item: ICalendarDay): void {
    const dialogRef = this.dialog.open(CalendarDialogComponent, {
      data: item,
    });
  }
}
