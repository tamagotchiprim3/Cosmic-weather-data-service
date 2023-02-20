import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirWeatherCardComponent } from './air-weather-card.component';

describe('BigWeatherCardComponent', () => {
  let component: AirWeatherCardComponent;
  let fixture: ComponentFixture<AirWeatherCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AirWeatherCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AirWeatherCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
