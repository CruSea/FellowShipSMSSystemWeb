import { TestBed, inject } from '@angular/core/testing';

import { GroupContactCountService } from './group-contact-count.service';

describe('GroupContactCountService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GroupContactCountService]
    });
  });

  it('should be created', inject([GroupContactCountService], (service: GroupContactCountService) => {
    expect(service).toBeTruthy();
  }));
});
