import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickAccessButtonsComponent } from './quick-access-buttons.component';

describe('QuickAccessButtonsComponent', () => {
  let component: QuickAccessButtonsComponent;
  let fixture: ComponentFixture<QuickAccessButtonsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuickAccessButtonsComponent]
    });
    fixture = TestBed.createComponent(QuickAccessButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
