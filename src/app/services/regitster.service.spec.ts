import { TestBed } from '@angular/core/testing';

import { RegitsterService } from './regitster.service';

describe('RegitsterService', () => {
  let service: RegitsterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegitsterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
