import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSmsPortComponent } from './add-sms-port.component';

describe('AddSmsPortComponent', () => {
  let component: AddSmsPortComponent;
  let fixture: ComponentFixture<AddSmsPortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSmsPortComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSmsPortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
