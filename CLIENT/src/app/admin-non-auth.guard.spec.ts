import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { adminNonAuthGuard } from './admin-non-auth.guard';

describe('adminNonAuthGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => adminNonAuthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
