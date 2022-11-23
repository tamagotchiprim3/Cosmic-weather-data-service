import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapWeatherCardComponent } from './map-weather-card.component';

describe('MapWeatherCardComponent', () => {
  let component: MapWeatherCardComponent;
  let fixture: ComponentFixture<MapWeatherCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapWeatherCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapWeatherCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
