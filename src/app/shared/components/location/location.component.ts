import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectLocation } from 'src/app/store/current-weather/current-weather.selectors';
import { ILocation } from '../../interfaces/weather.interface';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
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
