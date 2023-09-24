import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullWeatherHourlyComponent } from './full-weather-hourly.component';

describe('FullWeatherHourlyComponent', () => {
  let component: FullWeatherHourlyComponent;
  let fixture: ComponentFixture<FullWeatherHourlyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FullWeatherHourlyComponent]
    });
    fixture = TestBed.createComponent(FullWeatherHourlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
