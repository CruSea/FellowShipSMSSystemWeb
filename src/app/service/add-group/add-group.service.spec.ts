import { TestBed, inject } from '@angular/core/testing';

import { AddGroupService } from './add-group.service';

describe('AddGroupService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddGroupService]
    });
  });

  it('should be created', inject([AddGroupService], (service: AddGroupService) => {
    expect(service).toBeTruthy();
  }));
});
