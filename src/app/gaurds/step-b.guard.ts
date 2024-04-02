import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const stepBGuard: CanActivateFn = (route, state) => {
  let router = inject(Router);
  if (sessionStorage['carInfo'] && sessionStorage['colorCode']) {
    return true;
  } else {
    // Redirect to login page if not authenticated
    router.navigate(['/step1']);
    return false;
  };
};
