import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsVoteComponentComponent } from './sms-vote-component.component';

describe('SmsVoteComponentComponent', () => {
  let component: SmsVoteComponentComponent;
  let fixture: ComponentFixture<SmsVoteComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmsVoteComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmsVoteComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
