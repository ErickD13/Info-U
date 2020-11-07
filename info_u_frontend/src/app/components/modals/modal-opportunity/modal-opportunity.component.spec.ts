import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalOpportunityComponent } from './modal-opportunity.component';

describe('ModalOpportunityComponent', () => {
  let component: ModalOpportunityComponent;
  let fixture: ComponentFixture<ModalOpportunityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalOpportunityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalOpportunityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
