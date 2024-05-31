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
        path: 'admin',
        loadComponent: () => import('./login/admin_login.component').then(r => r.AdminLoginComponent),
    }
]