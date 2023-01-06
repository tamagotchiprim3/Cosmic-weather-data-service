import {
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss'],
})
export class WeatherCardComponent implements OnInit, OnChanges {
  @Input() public label: string;
  @Input() public value: number;

  constructor(private cdR: ChangeDetectorRef) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['label'].currentValue || changes['value'].currentValue) {
      this.cdR.markForCheck();
    }
  }

  ngOnInit(): void {}
}
