import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { ILocation } from 'src/app/shared/interfaces/weather.interface';
import { selectLocation } from 'src/app/store/weather/weather.selectors';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
@UntilDestroy()
export class LocationComponent implements OnInit, OnDestroy {
  public location: ILocation = {
    name: '',
    timezone: '',
    latitude: '',
    longitude: '',
  };

  constructor(private store: Store, private cdR: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.store
      .select(selectLocation)
      .pipe(untilDestroyed(this))
      .subscribe((location: ILocation): void => {
        if (location) {
          this.location = location;
          this.cdR.markForCheck();
        }
      });
  }
  ngOnDestroy(): void {}
}
