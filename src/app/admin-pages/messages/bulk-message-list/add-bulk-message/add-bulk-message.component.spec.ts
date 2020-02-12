import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBulkMessageComponent } from './add-bulk-message.component';

describe('AddBulkMessageComponent', () => {
  let component: AddBulkMessageComponent;
  let fixture: ComponentFixture<AddBulkMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBulkMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBulkMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
