import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  IGeocodingByCityResponse,
  IGeocodingByZipResponse,
} from '../interfaces/geocoding.interface';

@Injectable({
  providedIn: 'root',
})
export class GeocodingApiService {
  public endPoints = {
    byCityName: 'http://api.openweathermap.org/geo/1.0/direct',
    byZipCode: 'http://api.openweathermap.org/geo/1.0/zip',
  };

  constructor(private http: HttpClient) {}

  public getCoordinatesByCity(
    city: string
  ): Observable<IGeocodingByCityResponse[]> {
    return this.http.get<IGeocodingByCityResponse[]>(
      this.endPoints.byCityName,
      {
        params: {
          q: city,
        },
      }
    );
  }

  public getCoordinatesByZip(zip: number): Observable<IGeocodingByZipResponse> {
    return this.http.get<IGeocodingByZipResponse>(this.endPoints.byZipCode, {
      params: {
        zip: zip,
      },
    });
  }
}
