import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUpdateEmailComponent } from './modal-update-email.component';

describe('ModalUpdateEmailComponent', () => {
  let component: ModalUpdateEmailComponent;
  let fixture: ComponentFixture<ModalUpdateEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalUpdateEmailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalUpdateEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
