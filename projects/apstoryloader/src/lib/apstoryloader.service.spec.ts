import { TestBed } from '@angular/core/testing';

import { ApstoryloaderService } from './apstoryloader.service';

describe('ApstoryloaderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApstoryloaderService = TestBed.get(ApstoryloaderService);
    expect(service).toBeTruthy();
  });
});
