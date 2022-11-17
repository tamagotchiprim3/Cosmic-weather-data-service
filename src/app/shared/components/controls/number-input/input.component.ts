import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit, DoCheck, ControlValueAccessor {
  @Input() public type: string;
  @Input() public label: string;
  @Input() public errorMessage: string;
  @Input() public placeholder: string;

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
    // console.log(this.control);
  }

  writeValue(value: number): void {
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
