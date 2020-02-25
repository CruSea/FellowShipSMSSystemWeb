import { TestBed, inject } from '@angular/core/testing';

import { BulkMessageService } from './bulk-message.service';

describe('BulkMessageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BulkMessageService]
    });
  });

  it('should be created', inject([BulkMessageService], (service: BulkMessageService) => {
    expect(service).toBeTruthy();
  }));
});
