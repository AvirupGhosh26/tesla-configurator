import { Routes } from '@angular/router';
import { Step1Component } from './step1/step1.component';
import { Step2Component } from './step2/step2.component';
import { Step3Component } from './step3/step3.component';
import { stepBGuard } from './gaurds/step-b.guard';
import { stepCGuard } from './gaurds/step-c.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'level1', pathMatch: 'full' },
    {
      path: 'step1',
      component: Step1Component,
    },
    {
      path: 'step2',
      component: Step2Component,
      canActivate: [stepBGuard]
    },
    {
      path: 'step3',
      component: Step3Component,
      canActivate: [stepCGuard]
    },
  ];
