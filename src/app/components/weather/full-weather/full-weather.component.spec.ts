import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullWeatherComponent } from './full-weather.component';

describe('FullWeatherComponent', () => {
  let component: FullWeatherComponent;
  let fixture: ComponentFixture<FullWeatherComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FullWeatherComponent]
    });
    fixture = TestBed.createComponent(FullWeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
