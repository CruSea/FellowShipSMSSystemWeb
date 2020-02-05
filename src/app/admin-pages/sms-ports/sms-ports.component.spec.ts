import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsPortsComponent } from './sms-ports.component';

describe('SmsPortsComponent', () => {
  let component: SmsPortsComponent;
  let fixture: ComponentFixture<SmsPortsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmsPortsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmsPortsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
