import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const stepCGuard: CanActivateFn = (route, state) => {
  let router = inject(Router);

  if (localStorage['carConfigInfo']) {
    return true;
  } else {
    // Redirect to login page if not authenticated
    router.navigate(['/step2']);
    return false;
  };

};
