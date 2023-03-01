import {
  ChangeDetectionStrategy,
  Component,
  DoCheck,
  Input,
  OnInit,
} from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { IAutocompleteOption } from 'src/app/shared/constants/autocomplete-options.const';

@Component({
  selector: 'app-autocomplete-input',
  templateUrl: './autocomplete-input.component.html',
  styleUrls: ['./autocomplete-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteInputComponent
  implements OnInit, ControlValueAccessor, DoCheck
{
  @Input() public defaulfValue: string = '';
  @Input() public options: IAutocompleteOption[];
  @Input() public label: string;
  @Input() public errorMessage: string;
  @Input() public placeholder: string;

  public control = new FormControl();
  public value: any;
  public onChange: (value: any) => void;
  public onTouched: () => void;

  constructor(
    private ngControl: NgControl,
    private translate: TranslateService
  ) {
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

  public trackByFn(index: any, item: any): any {
    return index;
  }
}
