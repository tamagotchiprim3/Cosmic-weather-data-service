import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { ILocation } from 'src/app/shared/interfaces/weather.interface';
import { selectLocation } from 'src/app/store/weather/weather.selectors';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationComponent implements OnInit {
  public location: ILocation = {
    name: '',
    timezone: '',
    latitude: '',
    longitude: '',
  };

  constructor(private store: Store, private cdR: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.store.select(selectLocation).subscribe((location: ILocation): void => {
      if (location) {
        this.location = location;
        this.cdR.markForCheck();
      }
    });
  }
}
