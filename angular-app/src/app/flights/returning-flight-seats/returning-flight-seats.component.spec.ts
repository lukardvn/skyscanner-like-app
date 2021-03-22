import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturningFlightSeatsComponent } from './returning-flight-seats.component';

describe('ReturningFlightSeatsComponent', () => {
  let component: ReturningFlightSeatsComponent;
  let fixture: ComponentFixture<ReturningFlightSeatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReturningFlightSeatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturningFlightSeatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
