import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportGroupContactComponent } from './import-group-contact.component';

describe('ImportGroupContactComponent', () => {
  let component: ImportGroupContactComponent;
  let fixture: ComponentFixture<ImportGroupContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportGroupContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportGroupContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
