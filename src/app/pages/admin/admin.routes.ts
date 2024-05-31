import { Routes } from "@angular/router";

export const ADMIN_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./admin-dashboard/admin-dashboard.component').then(r => r.AdminDashboardComponent),
    },

]