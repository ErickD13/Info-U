import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalHistoryComponent } from './modal-history.component';

describe('ModalHistoryComponent', () => {
  let component: ModalHistoryComponent;
  let fixture: ComponentFixture<ModalHistoryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
