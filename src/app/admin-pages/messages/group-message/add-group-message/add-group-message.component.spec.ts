import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGroupMessageComponent } from './add-group-message.component';

describe('AddGroupMessageComponent', () => {
  let component: AddGroupMessageComponent;
  let fixture: ComponentFixture<AddGroupMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddGroupMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGroupMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
