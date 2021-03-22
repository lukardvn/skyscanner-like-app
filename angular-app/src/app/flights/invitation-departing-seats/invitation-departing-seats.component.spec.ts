import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitationDepartingSeatsComponent } from './invitation-departing-seats.component';

describe('InvitationDepartingSeatsComponent', () => {
  let component: InvitationDepartingSeatsComponent;
  let fixture: ComponentFixture<InvitationDepartingSeatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvitationDepartingSeatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvitationDepartingSeatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
