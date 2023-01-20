import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss'],
})
export class WeatherCardComponent implements OnInit {
  @Input() public label: string;
  @Input() public value: number;

  constructor(private cdR: ChangeDetectorRef) {}

  ngOnInit(): void {}
}
