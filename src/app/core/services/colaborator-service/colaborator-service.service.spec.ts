import { TestBed } from '@angular/core/testing';

import { ColaboratorServiceService } from './colaborator-service.service';

describe('ColaboratorServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ColaboratorServiceService = TestBed.get(ColaboratorServiceService);
    expect(service).toBeTruthy();
  });
});
