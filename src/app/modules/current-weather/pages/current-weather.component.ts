import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IGeocodingByCityResponse } from 'src/app/shared/interfaces/geocoding.interface';
import { GeocodingApiService } from 'src/app/shared/services/geocoding-api.service';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss'],
})
export class CurrentWeatherComponent implements OnInit {
  constructor(private service: GeocodingApiService) {}

  ngOnInit(): void {
    this.service
      .getCoordinatesByCity('Bryansk')
      .subscribe((data) => console.log(data));
  }
}
