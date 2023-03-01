import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { cloneDeep } from 'lodash';
import { DAYS_OF_THE_WEEK } from 'src/app/shared/constants/days-of-the-week.conts';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent {
  public calendarData?: IMonthlyForecastResponse;
  public daysOfTheWeek: string[] = DAYS_OF_THE_WEEK;
  constructor(
    private store: Store,
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {
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
      }
      this.cdr.markForCheck();
    });
  }

  public openDialog(item: ICalendarDay): void {
    const dialogRef = this.dialog.open(CalendarDialogComponent, {
      data: item,
    });
  }
  public trackByFn(index: any, item: any): any {
    return index;
  }
}
