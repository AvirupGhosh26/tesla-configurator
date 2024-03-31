import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { stepBGuard } from './step-b.guard';

describe('stepBGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => stepBGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
