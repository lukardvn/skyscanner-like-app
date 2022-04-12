import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AirlineDestinationsAddComponent } from './airline-destinations-add.component';

describe('AirlineDestinationsAddComponent', () => {
  let component: AirlineDestinationsAddComponent;
  let fixture: ComponentFixture<AirlineDestinationsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AirlineDestinationsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirlineDestinationsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
