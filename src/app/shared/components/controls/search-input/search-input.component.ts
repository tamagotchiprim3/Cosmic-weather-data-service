import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IWeatherCard } from 'src/app/shared/interfaces/weather.interface';
import { selectWeatherCards } from 'src/app/store/current-weather/current-weather.selectors';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
})
export class SearchInputComponent
  implements OnInit, DoCheck, ControlValueAccessor
{
  @Input() public label: string;
  @Input() public placeholder: string;
  @Input() public width: string = '250px';
  @Input() public nodes: IWeatherCard[];

  public control = new FormControl();
  public value: any;
  public onChange: (value: any) => void;
  public onTouched: () => void;

  constructor(private ngControl: NgControl, private store: Store) {
    ngControl.valueAccessor = this;
    if (ngControl.control) {
      this.control.setParent(ngControl.control.parent);
    }
  }

  ngDoCheck(): void {
    if (this.ngControl.control.errors !== this.control.errors) {
      this.initErrors();
    }
  }

  writeValue(value: any): void {
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  ngOnInit(): void {
    this.control.setValue(this.ngControl.control.value);
    this.control.valueChanges.subscribe((value: any) => {
      this.onChange(value);
    });
  }

  public initErrors(): void {
    this.control.setErrors(this.ngControl.control.errors);
  }
}
