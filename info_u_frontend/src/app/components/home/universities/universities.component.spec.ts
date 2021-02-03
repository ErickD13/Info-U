import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UniversitiesComponent } from './universities.component';

describe('UniversitiesComponent', () => {
  let component: UniversitiesComponent;
  let fixture: ComponentFixture<UniversitiesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UniversitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniversitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
