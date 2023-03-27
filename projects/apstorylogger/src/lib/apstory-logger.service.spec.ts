import { TestBed } from '@angular/core/testing';

import { ApstoryLoggerService } from './apstory-logger.service';

describe('ApstoryLoggerService', () => {
  let service: ApstoryLoggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApstoryLoggerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
