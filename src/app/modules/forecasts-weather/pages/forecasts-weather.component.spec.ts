import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForecastsWeatherComponent } from './forecasts-weather.component';

describe('ForecastsWeatherComponent', () => {
  let component: ForecastsWeatherComponent;
  let fixture: ComponentFixture<ForecastsWeatherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForecastsWeatherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForecastsWeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
