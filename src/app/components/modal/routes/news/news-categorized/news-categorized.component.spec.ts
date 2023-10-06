import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsCategorizedComponent } from './news-categorized.component';

describe('NewsCategorizedComponent', () => {
  let component: NewsCategorizedComponent;
  let fixture: ComponentFixture<NewsCategorizedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewsCategorizedComponent]
    });
    fixture = TestBed.createComponent(NewsCategorizedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
