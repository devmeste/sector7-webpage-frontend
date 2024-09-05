import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { combinedGuard } from './combined.guard';

describe('combinedGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => combinedGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
