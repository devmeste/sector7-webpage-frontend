import { Routes } from '@angular/router';
import { adminGuard } from './core/guards/admin-guard.guard';

export const routes: Routes = [
    {
        path: '', 
        loadChildren : ()=> import('./pages/store/store.routes').then(r=>r.STORE_ROUTES)
    },
    {
        path: 'auth', 
        loadChildren : ()=> import('./pages/auth/auth.routes').then(r=>r.AUTH_ROUTES)
    },
    {
        path: 'admin-dashboard', 
        loadChildren : ()=> import('./pages/admin/admin.routes').then(r=>r.ADMIN_ROUTES),
        canActivate: [adminGuard]
    },
    {
        path: 'admin-dashboard/login',
        loadComponent : ()=> import('./pages/auth/login/admin_login.component').then(r=>r.AdminLoginComponent),
    },
    { // quitar luego
        path: 'prueba', 
        loadComponent : ()=> import('./prueba/prueba.component').then(r=>r.PruebaComponent),
    },
    {
        path: '**', 
        loadChildren : ()=> import('./pages/store/store.routes').then(r=>r.STORE_ROUTES)
    },
];
