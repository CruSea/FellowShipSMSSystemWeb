import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupedContactListComponent } from './grouped-contact-list.component';

describe('GroupedContactListComponent', () => {
  let component: GroupedContactListComponent;
  let fixture: ComponentFixture<GroupedContactListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupedContactListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupedContactListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
