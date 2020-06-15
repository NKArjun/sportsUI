import { TestBed } from '@angular/core/testing';

import { CricketProfileService } from './cricket-profile.service';

describe('CricketProfileService', () => {
  let service: CricketProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CricketProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
