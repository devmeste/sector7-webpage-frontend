import { Routes } from '@angular/router';

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
        loadChildren : ()=> import('./pages/admin/admin.routes').then(r=>r.ADMIN_ROUTES)
    },
    {
        path: '**', 
        loadChildren : ()=> import('./pages/store/store.routes').then(r=>r.STORE_ROUTES)
    },
];
