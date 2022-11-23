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
  @Input() public location: string;
  @Input() public timezone: string;
  @Input() public latitude: number;
  @Input() public longitude: number;

  constructor(private store: Store) {}

  ngOnInit(): void {}
}
