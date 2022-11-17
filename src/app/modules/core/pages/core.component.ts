import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CURRENT_WEATHER_PATH } from 'src/app/shared/constants/routing.const';
import { GeocodingApiService } from 'src/app/shared/services/geocoding-api.service';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoreComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {}
}
