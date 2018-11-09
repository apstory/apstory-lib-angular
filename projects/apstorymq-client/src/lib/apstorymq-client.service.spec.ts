import { TestBed } from '@angular/core/testing';

import { ApstorymqClientService } from './apstorymq-client.service';

describe('ApstorymqClientService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApstorymqClientService = TestBed.get(ApstorymqClientService);
    expect(service).toBeTruthy();
  });
});
