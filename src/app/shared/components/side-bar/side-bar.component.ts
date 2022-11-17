import { Component, DoCheck, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import {
  AUTOCOMPLETE_OPTIONS,
  IAutocompleteOption,
} from '../../constants/autocomplete-options.const';
import { IWeatherForm } from '../../interfaces/weather.interface';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent implements OnInit {
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
        }
      });
  }
}
