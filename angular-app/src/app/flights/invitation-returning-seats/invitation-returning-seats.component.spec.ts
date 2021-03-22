import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitationReturningSeatsComponent } from './invitation-returning-seats.component';

describe('InvitationReturningSeatsComponent', () => {
  let component: InvitationReturningSeatsComponent;
  let fixture: ComponentFixture<InvitationReturningSeatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvitationReturningSeatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvitationReturningSeatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
