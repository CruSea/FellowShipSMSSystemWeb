import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddContactMessageComponent } from './add-contact-message.component';

describe('AddContactMessageComponent', () => {
  let component: AddContactMessageComponent;
  let fixture: ComponentFixture<AddContactMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddContactMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddContactMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
