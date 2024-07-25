import { TestBed } from '@angular/core/testing';

import { ChargeJsScriptsService } from './charge-js-scripts.service';

describe('ChargeJsScriptsService', () => {
  let service: ChargeJsScriptsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChargeJsScriptsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
