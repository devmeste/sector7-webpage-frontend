import { Routes } from "@angular/router";

export const AUTH_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./login/login.component').then(r => r.LoginComponent),
    },
    {
        path: 'register',
        loadComponent: () => import('./register/register.component').then(r => r.RegisterComponent),
    },
    {
        path: 'recover-password',
        loadComponent: () => import('./recover-password/recover-password.component').then(r => r.RecoverPasswordComponent),
    },
    {
        path: 'recover-user',
        loadComponent: () => import('./recover-user/recover-user.component').then(r => r.RecoverUserComponent),
    },
]