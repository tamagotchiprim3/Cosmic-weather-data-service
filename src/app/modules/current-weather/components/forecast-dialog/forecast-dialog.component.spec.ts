import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForecastDialogComponent } from './forecast-dialog.component';

describe('ForecastDialogComponent', () => {
  let component: ForecastDialogComponent;
  let fixture: ComponentFixture<ForecastDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForecastDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForecastDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
