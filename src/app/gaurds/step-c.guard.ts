import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ModelSelect } from '../models/model-select';

export const stepCGuard: CanActivateFn = (route, state) => {
  let router = inject(Router);
  let storageValue: ModelSelect = JSON.parse(sessionStorage.getItem('carConfigInfo') || '{}');
  if (storageValue['config']) {
    return true;
  } else {
    // Redirect to login page if not authenticated
    router.navigate(['/step2']);
    return false;
  };
};
