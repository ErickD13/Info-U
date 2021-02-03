import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OportunitiesComponent } from './opportunities.component';

describe('OportunitiesComponent', () => {
  let component: OportunitiesComponent;
  let fixture: ComponentFixture<OportunitiesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OportunitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OportunitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
