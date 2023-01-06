import {
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
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
  geocodingByCity,
  geocodingByZip,
  getCurrentWeather,
} from 'src/app/store/current-weather/current-weather.actions';
import {
  selectLatitude,
  selectLongitude,
} from 'src/app/store/current-weather/current-weather.selectors';
import {
  AUTOCOMPLETE_MAP_OPTIONS,
  AUTOCOMPLETE_OPTIONS,
  IAutocompleteOption,
} from '../../constants/autocomplete-options.const';
import {
  IGetCurrentWeather,
  IWeatherForm,
} from '../../interfaces/weather.interface';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
@UntilDestroy()
export class SideBarComponent implements OnInit, OnDestroy, OnChanges {
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
  ngOnDestroy(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['latitude'].currentValue && changes['longitude'].currentValue) {
      console.log(this.latitude);
      this.store.dispatch(
        getCurrentWeather({
          data: { lat: this.latitude, lon: this.longitude },
        })
      );
    }
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

        console.log(this.longitude);
      });

    this.autocompleteControl.setValue(this.autocompleteOptions[0].value);
    this.autocompleteControl.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe((): void => {
        this.locationForm.reset();
      });
  }
}
