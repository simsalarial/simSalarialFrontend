import { TestBed } from '@angular/core/testing';

import { RetrieveDataService } from './retrieve-data.service';

describe('RetrieveDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RetrieveDataService = TestBed.get(RetrieveDataService);
    expect(service).toBeTruthy();
  });
});
