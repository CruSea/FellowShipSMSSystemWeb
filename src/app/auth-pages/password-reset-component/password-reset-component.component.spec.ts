import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordResetComponentComponent } from './password-reset-component.component';

describe('PasswordResetComponentComponent', () => {
  let component: PasswordResetComponentComponent;
  let fixture: ComponentFixture<PasswordResetComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordResetComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordResetComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
