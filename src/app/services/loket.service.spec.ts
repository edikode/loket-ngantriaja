import { TestBed } from '@angular/core/testing';

import { LoketService } from './loket.service';

describe('LoketService', () => {
  let service: LoketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
