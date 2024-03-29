import {
  ChangeDetectionStrategy,
  Component,
  DoCheck,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
@UntilDestroy()
export class InputComponent
  implements OnInit, DoCheck, ControlValueAccessor, OnDestroy
{
  @Input() public min: number;
  @Input() public max: number;
  @Input() public type: string;
  @Input() public label: string;
  @Input() public errorMessage: string;
  @Input() public placeholder: string;
  @Input() public width: string = '250px';

  public control = new FormControl();
  public value: any;
  public onChange: (value: any) => void;
  public onTouched: () => void;

  constructor(private ngControl: NgControl) {
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
  ngOnDestroy(): void {}

  writeValue(value: any): void {
    this.control.setValue(value);
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
    this.control.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe((value: any) => {
        this.onChange(value);
      });
  }

  public initErrors(): void {
    this.control.setErrors(this.ngControl.control.errors);
  }
}
