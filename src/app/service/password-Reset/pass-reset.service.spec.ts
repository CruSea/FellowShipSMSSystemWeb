import { TestBed, inject } from '@angular/core/testing';

import { PassResetService } from './pass-reset.service';

describe('PassResetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PassResetService]
    });
  });

  it('should be created', inject([PassResetService], (service: PassResetService) => {
    expect(service).toBeTruthy();
  }));
});
