import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTabComponent } from './modal-tab.component';

describe('ModalTabComponent', () => {
  let component: ModalTabComponent;
  let fixture: ComponentFixture<ModalTabComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalTabComponent]
    });
    fixture = TestBed.createComponent(ModalTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
