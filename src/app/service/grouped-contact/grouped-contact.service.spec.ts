import { TestBed, inject } from '@angular/core/testing';

import { GroupedContactService } from './grouped-contact.service';

describe('GroupedContactService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GroupedContactService]
    });
  });

  it('should be created', inject([GroupedContactService], (service: GroupedContactService) => {
    expect(service).toBeTruthy();
  }));
});
