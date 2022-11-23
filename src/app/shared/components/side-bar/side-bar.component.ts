import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import {
  AUTOCOMPLETE_MAP_OPTIONS,
  AUTOCOMPLETE_OPTIONS,
  IAutocompleteOption,
} from '../../constants/autocomplete-options.const';
import {
  IGetCurrentWeather,
  IMapForm,
  IWeatherForm,
} from '../../interfaces/weather.interface';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent implements OnInit {
  @Output() public location = new EventEmitter<
    IGetCurrentWeather | string | number
  >();
  @Output() public map = new EventEmitter<IMapForm>();

  public autocompleteMapOptions: IAutocompleteOption[] =
    AUTOCOMPLETE_MAP_OPTIONS;
  public autocompleteOptions: IAutocompleteOption[] = AUTOCOMPLETE_OPTIONS;
  public autocompleteControl: FormControl = new FormControl();
  public locationForm?: FormGroup;

  constructor(private fb: FormBuilder) {
    this.locationForm = this.fb.group({
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
      city: ['', Validators.required],
      zip: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.autocompleteControl.setValue(this.autocompleteOptions[0].value);
    this.autocompleteControl.valueChanges.subscribe((): void => {
      this.locationForm.reset();
    });
    this.locationForm.valueChanges
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((formValue: IWeatherForm): void => {
        if (formValue.latitude && formValue.longitude) {
          this.emitValue(this.location, {
            lat: formValue.latitude,
            lon: formValue.longitude,
          });
        }

        if (formValue.city) {
          this.emitValue(this.location, formValue.city);
        }

        if (formValue.zip) {
          this.emitValue(this.location, formValue.zip);
        }
      });
  }

  public emitValue(output: EventEmitter<any>, data: any): void {
    output.emit(data);
  }
}
