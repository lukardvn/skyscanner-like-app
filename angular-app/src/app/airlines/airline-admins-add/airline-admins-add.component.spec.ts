import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AirlineAdminsAddComponent } from './airline-admins-add.component';

describe('AirlineAdminsAddComponent', () => {
  let component: AirlineAdminsAddComponent;
  let fixture: ComponentFixture<AirlineAdminsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AirlineAdminsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirlineAdminsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
