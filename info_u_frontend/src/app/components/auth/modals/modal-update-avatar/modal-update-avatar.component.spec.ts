import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUpdateAvatarComponent } from './modal-update-avatar.component';

describe('ModalUpdateAvatarComponent', () => {
  let component: ModalUpdateAvatarComponent;
  let fixture: ComponentFixture<ModalUpdateAvatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalUpdateAvatarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalUpdateAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
