import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICalendarDay } from 'src/app/shared/interfaces/weather.interface';

@Component({
  selector: 'app-calendar-dialog',
  templateUrl: './calendar-dialog.component.html',
  styleUrls: ['./calendar-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<CalendarDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: ICalendarDay
  ) {}
}
