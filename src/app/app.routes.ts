import { Routes } from '@angular/router';
import { Signup } from './auth/signup/signup';
import { Login } from './auth/login/login';
import { Home } from './home/home';
import { authGuard } from './auth/auth-guard';
import { Layout } from './shared/layout/layout';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: Login,
    pathMatch: 'full',
  },
  {
    path: 'signup',
    component: Signup,
    pathMatch: 'full',
  },
  {
    path: 'notes',
    pathMatch: 'full',
    component: Layout,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        component: Home,
      },
    ]
  },
];
