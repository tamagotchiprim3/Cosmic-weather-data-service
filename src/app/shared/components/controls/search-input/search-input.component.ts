import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  Component,
  DoCheck,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { map, Observable, startWith } from 'rxjs';
import { IWeatherCard } from 'src/app/shared/interfaces/weather.interface';
@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
})
export class SearchInputComponent
  implements DoCheck, ControlValueAccessor, OnChanges
{
  @Input() public label: string;
  @Input() public placeholder: string;
  @Input() public width: string = '250px';
  @Input() public nodes: IWeatherCard[];

  public separatorKeysCodes: number[] = [ENTER, COMMA];
  public control = new FormControl();
  public inputControl = new FormControl();
  public filteredOptions$: Observable<IWeatherCard[]>;
  public value: IWeatherCard[];
  public onChange: (value: IWeatherCard[]) => void;
  public onTouched: () => void;

  constructor(private ngControl: NgControl) {
    ngControl.valueAccessor = this;
    if (ngControl.control) {
      this.control.setParent(ngControl.control.parent);
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['nodes']?.currentValue?.length) {
      const control = this.inputControl;
      this.filteredOptions$ = control.valueChanges.pipe(
        startWith(''),
        map((value: IWeatherCard) =>
          typeof value === 'string' ? value : value ? value.label : ''
        ),
        map((value: string) =>
          value ? this.filter(value.toLowerCase()) : this.nodes.slice()
        )
      );
    }
  }

  ngDoCheck(): void {
    if (this.ngControl.control.errors !== this.control.errors) {
      this.initErrors();
    }
  }

  writeValue(value: IWeatherCard[]): void {
    this.control.setValue(value);
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public initErrors(): void {
    this.control.setErrors(this.ngControl.control.errors);
  }

  public remove(card: IWeatherCard): void {
    this.control.setValue([
      ...this.control.value.filter((val: IWeatherCard) => val.key !== card.key),
    ]);
    this.control.markAsTouched();
    this.onChange(this.control.value);
  }

  public selected(event: MatAutocompleteSelectedEvent) {
    const values = this.control.value.map((val: IWeatherCard) => val.label);
    if (!values.includes(event.option.viewValue)) {
      this.control.setValue([...this.control.value, event.option.value]);
    }

    this.inputControl.reset('');
    this.onChange(this.control.value);
  }

  private filter(filterValue: string): any[] {
    return this.nodes.filter((option: IWeatherCard) =>
      option.label.toLowerCase().includes(filterValue)
    );
  }

  public clearInputView(event: MatChipInputEvent) {
    event.chipInput?.clear();
  }
}
