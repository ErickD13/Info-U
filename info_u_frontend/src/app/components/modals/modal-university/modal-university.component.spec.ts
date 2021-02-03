import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalUniversityComponent } from './modal-university.component';

describe('ModalUniversityComponent', () => {
  let component: ModalUniversityComponent;
  let fixture: ComponentFixture<ModalUniversityComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalUniversityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalUniversityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
