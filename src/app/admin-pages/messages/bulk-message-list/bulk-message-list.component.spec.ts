import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkMessageListComponent } from './bulk-message-list.component';

describe('BulkMessageListComponent', () => {
  let component: BulkMessageListComponent;
  let fixture: ComponentFixture<BulkMessageListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BulkMessageListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkMessageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
