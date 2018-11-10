import { TestBed } from '@angular/core/testing';

import { ApstoryloggerService } from './apstorylogger.service';

describe('ApstoryloggerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApstoryloggerService = TestBed.get(ApstoryloggerService);
    expect(service).toBeTruthy();
  });
});
