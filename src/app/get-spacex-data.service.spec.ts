import { TestBed } from '@angular/core/testing';

import { GetSpacexDataService } from './get-spacex-data.service';

describe('GetSpacexDataService', () => {
  let service: GetSpacexDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetSpacexDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
