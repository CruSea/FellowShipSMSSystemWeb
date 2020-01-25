import { TestBed, inject } from '@angular/core/testing';

import { Service\authentication\authenticationService } from './service\authentication\authentication.service';

describe('Service\authentication\authenticationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Service\authentication\authenticationService]
    });
  });

  it('should be created', inject([Service\authentication\authenticationService], (service: Service\authentication\authenticationService) => {
    expect(service).toBeTruthy();
  }));
});
