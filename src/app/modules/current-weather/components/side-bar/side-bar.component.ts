import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import {
  AUTOCOMPLETE_MAP_OPTIONS,
  AUTOCOMPLETE_OPTIONS,
  IAutocompleteOption,
} from 'src/app/shared/constants/autocomplete-options.const';
import { IWeatherForm } from 'src/app/shared/interfaces/weather.interface';
import {
  geocodingByCity,
  geocodingByZip,
  getCurrentWeather,
} from 'src/app/store/weather/current-weather.actions';
import {
  selectLatitude,
  selectLongitude,
} from 'src/app/store/weather/weather.selectors';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
@UntilDestroy()
export class SideBarComponent implements OnInit, OnDestroy {
  public autocompleteMapOptions: IAutocompleteOption[] =
    AUTOCOMPLETE_MAP_OPTIONS;
  public autocompleteOptions: IAutocompleteOption[] = AUTOCOMPLETE_OPTIONS;
  public autocompleteControl: FormControl = new FormControl();
  public locationForm?: FormGroup;
  public latitude: number;
  public longitude: number;

  constructor(private fb: FormBuilder, private store: Store) {
    this.locationForm = this.fb.group({
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
      city: ['', Validators.required],
      zip: ['', Validators.required],
    });
    this.locationForm
      .get('latitude')
      .valueChanges.subscribe((value: number) => {
        if (value < -90) {
          this.locationForm.get('latitude').setValue(-90);
        } else if (value > 90) {
          this.locationForm.get('latitude').setValue(90);
        }
      });

    this.locationForm
      .get('longitude')
      .valueChanges.subscribe((value: number) => {
        if (value < -180) {
          this.locationForm.get('longitude').setValue(-180);
        } else if (value > 180) {
          this.locationForm.get('longitude').setValue(180);
        }
      });

    this.locationForm.valueChanges
      .pipe(untilDestroyed(this), debounceTime(1000), distinctUntilChanged())
      .subscribe((formValue: IWeatherForm): void => {
        if (formValue.latitude && formValue.longitude) {
          this.store.dispatch(
            getCurrentWeather({
              data: { lat: formValue.latitude, lon: formValue.longitude },
            })
          );
        }
        if (formValue.city) {
          this.store.dispatch(geocodingByCity({ data: formValue.city }));
        }
        if (formValue.zip) {
          this.store.dispatch(geocodingByZip({ data: formValue.zip }));
        }
      });
  }

  ngOnInit(): void {
    this.store
      .select(selectLatitude)
      .pipe(untilDestroyed(this))
      .subscribe((lat) => {
        this.latitude = lat;
        this.locationForm.get('latitude').patchValue(lat);
      });
    this.store
      .select(selectLongitude)
      .pipe(untilDestroyed(this))
      .subscribe((lon) => {
        this.longitude = lon;
        this.locationForm.get('longitude').patchValue(lon);
      });

    this.autocompleteControl.setValue(this.autocompleteOptions[0].value);
    this.autocompleteControl.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe((): void => {
        this.locationForm.reset();
      });
  }

  ngOnDestroy(): void {}
}
