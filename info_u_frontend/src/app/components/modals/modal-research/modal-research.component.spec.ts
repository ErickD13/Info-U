import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalResearchComponent } from './modal-research.component';

describe('ModalResearchComponent', () => {
  let component: ModalResearchComponent;
  let fixture: ComponentFixture<ModalResearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalResearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalResearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
