import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { GeocodingApiService } from './shared/services/geocoding-api.service';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor() {}
}
