import {
  Component,
  DoCheck,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Store } from '@ngrx/store';
import { IWeatherCard } from 'src/app/shared/interfaces/weather.interface';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
})
export class SearchInputComponent
  implements OnInit, DoCheck, ControlValueAccessor, OnChanges
{
  @Input() public label: string;
  @Input() public placeholder: string;
  @Input() public width: string = '250px';
  @Input() public nodes: IWeatherCard[];

  public control = new FormControl();
  public inputControl = new FormControl();
  public filteredOptions: IWeatherCard[] = [];
  public value: IWeatherCard[];
  public onChange: (value: IWeatherCard[]) => void;
  public onTouched: () => void;

  constructor(private ngControl: NgControl, private store: Store) {
    ngControl.valueAccessor = this;
    if (ngControl.control) {
      this.control.setParent(ngControl.control.parent);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['nodes'] && changes['nodes'].currentValue) {
      this.filteredOptions = this.nodes;
    }
  }

  ngOnInit(): void {
    this.control.valueChanges.subscribe((value: IWeatherCard[]) => {
      this.onChange(value);
    });
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
      ...this.control.value.filter((value: any) => value !== card),
    ]);
    this.filteredOptions.unshift(card);
    console.log('this.filteredOptions pushed', this.filteredOptions);
  }

  public selected(event: MatAutocompleteSelectedEvent) {
    this.control.setValue([...this.control.value, event.option.value]);
    this.filteredOptions = this.filterNodes(event.option.value);
    this.inputControl.reset('');
  }

  public filterNodes(value: IWeatherCard): IWeatherCard[] {
    return this.filteredOptions.filter((card: IWeatherCard) => {
      return card.label !== value.label;
    });
  }

  public clearInputView(event: MatChipInputEvent) {
    event.chipInput?.clear();
  }
}
