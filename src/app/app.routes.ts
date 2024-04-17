import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '', 
        loadChildren : ()=> import('./pages/store/store.routes').then(r=>r.STORE_ROUTES)
    },
    {
        path: 'hola', 
        loadChildren : ()=> import('./pages/store/store.routes').then(r=>r.STORE_ROUTES)
    },
    {
        path: '**', 
        loadChildren : ()=> import('./pages/store/store.routes').then(r=>r.STORE_ROUTES)
    },
];
