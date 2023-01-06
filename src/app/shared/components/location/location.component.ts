import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectLatitude,
  selectLocation,
  selectLongitude,
  selectTimezone,
} from 'src/app/store/current-weather/current-weather.selectors';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
})
export class LocationComponent implements OnInit {
  public location: string;
  public timezone: string;
  public latitude: number;
  public longitude: number;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.select(selectLocation).subscribe((location: string): void => {
      this.location = location;
    });

    this.store.select(selectTimezone).subscribe((timezone: number): void => {
      if (timezone) {
        this.timezone = '+' + timezone / 3600 + ' UTC';
      }
    });

    this.store.select(selectLatitude).subscribe((latitude: number): void => {
      this.latitude = latitude;
    });

    this.store.select(selectLongitude).subscribe((longitude: number): void => {
      this.longitude = longitude;
    });
  }
}
