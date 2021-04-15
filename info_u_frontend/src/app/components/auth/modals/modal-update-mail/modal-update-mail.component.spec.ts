import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUpdateMailComponent } from './modal-update-mail.component';

describe('ModalUpdateMailComponent', () => {
  let component: ModalUpdateMailComponent;
  let fixture: ComponentFixture<ModalUpdateMailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalUpdateMailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalUpdateMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
