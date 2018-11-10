import { TestBed } from '@angular/core/testing';

import { ApstorydnnNavigationService } from './apstorydnn-navigation.service';

describe('ApstorydnnNavigationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApstorydnnNavigationService = TestBed.get(ApstorydnnNavigationService);
    expect(service).toBeTruthy();
  });
});
