import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullWeatherDetailedViewComponent } from './full-weather-detailed-view.component';

describe('FullWeatherDetailedViewComponent', () => {
  let component: FullWeatherDetailedViewComponent;
  let fixture: ComponentFixture<FullWeatherDetailedViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FullWeatherDetailedViewComponent]
    });
    fixture = TestBed.createComponent(FullWeatherDetailedViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
