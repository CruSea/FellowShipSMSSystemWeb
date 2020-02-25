import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateGroupContactComponent } from './update-group-contact.component';

describe('UpdateGroupContactComponent', () => {
  let component: UpdateGroupContactComponent;
  let fixture: ComponentFixture<UpdateGroupContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateGroupContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateGroupContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
