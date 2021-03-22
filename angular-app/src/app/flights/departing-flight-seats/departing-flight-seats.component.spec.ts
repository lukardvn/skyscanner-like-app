import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartingFlightSeatsComponent } from './departing-flight-seats.component';

describe('DepartingFlightSeatsComponent', () => {
  let component: DepartingFlightSeatsComponent;
  let fixture: ComponentFixture<DepartingFlightSeatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartingFlightSeatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartingFlightSeatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
