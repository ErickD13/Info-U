import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuestraInvestigacionComponent } from './nuestra-investigacion.component';

describe('NuestraInvestigacionComponent', () => {
  let component: NuestraInvestigacionComponent;
  let fixture: ComponentFixture<NuestraInvestigacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuestraInvestigacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuestraInvestigacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
