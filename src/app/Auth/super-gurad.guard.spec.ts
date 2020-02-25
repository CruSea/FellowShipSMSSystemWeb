import { TestBed, async, inject } from '@angular/core/testing';

import { SuperGuradGuard } from './super-gurad.guard';

describe('SuperGuradGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SuperGuradGuard]
    });
  });

  it('should ...', inject([SuperGuradGuard], (guard: SuperGuradGuard) => {
    expect(guard).toBeTruthy();
  }));
});
