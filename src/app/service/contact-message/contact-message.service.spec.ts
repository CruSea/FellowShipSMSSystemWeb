import { TestBed, inject } from '@angular/core/testing';

import { ContactMessageService } from './contact-message.service';

describe('ContactMessageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContactMessageService]
    });
  });

  it('should be created', inject([ContactMessageService], (service: ContactMessageService) => {
    expect(service).toBeTruthy();
  }));
});
