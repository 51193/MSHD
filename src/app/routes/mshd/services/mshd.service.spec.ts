import { TestBed } from '@angular/core/testing';

import { MshdService } from './mshd.service';

describe('MshdService', () => {
  let service: MshdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MshdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
