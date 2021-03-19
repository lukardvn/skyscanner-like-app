import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListInvitationsComponent } from './list-invitations.component';

describe('ListInvitationsComponent', () => {
  let component: ListInvitationsComponent;
  let fixture: ComponentFixture<ListInvitationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListInvitationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListInvitationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
