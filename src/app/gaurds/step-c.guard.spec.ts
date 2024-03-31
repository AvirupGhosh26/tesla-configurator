import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { stepCGuard } from './step-c.guard';

describe('stepCGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => stepCGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
