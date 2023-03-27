import { TestBed } from '@angular/core/testing';

import { ApstoryLoggerService } from './apstorylogger.service';

describe('ApstoryloggerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApstoryLoggerService = TestBed.get(ApstoryLoggerService);
    expect(service).toBeTruthy();
  });
});
