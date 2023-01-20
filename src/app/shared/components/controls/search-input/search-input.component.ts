import {
  Component,
  DoCheck,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IWeatherCard } from 'src/app/shared/interfaces/weather.interface';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
})
export class SearchInputComponent
  implements OnInit, DoCheck, ControlValueAccessor
{
  @ViewChild('cardInput') cardInput: ElementRef<HTMLInputElement>;
  @Input() public label: string;
  @Input() public placeholder: string;
  @Input() public width: string = '250px';
  @Input() public nodes: IWeatherCard[];

  public control = new FormControl();
  public selectedCards: IWeatherCard[];
  public value: IWeatherCard[];
  public onChange: (value: IWeatherCard[]) => void;
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

  writeValue(value: IWeatherCard[]): void {
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
    this.control.valueChanges.subscribe((value: IWeatherCard[]) => {
      this.selectedCards = { ...value };
      this.onChange(value);
    });
  }

  public initErrors(): void {
    this.control.setErrors(this.ngControl.control.errors);
  }

  public remove(index: number): void {
    this.selectedCards.splice(index, 1);
  }

  // public add(event: MatChipInputEvent): void {
  //   const value: IWeatherCard[] = event.value;

  //   if (value) {
  //     this.selectedCards.push(value);
  //   }
  //   event.chipInput!.clear();
  //   this.control.setValue(null);
  // }

  // public selected(event: MatAutocompleteSelectedEvent) {
  //   this.selectedCards.push(event.option.viewValue);
  //   this.cardInput.nativeElement.value = '';
  //   this.control.setValue('');
  // }
}
