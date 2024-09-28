import { Routes } from "@angular/router";
import { combinedGuard } from "app/core/guards/combined-guard/combined.guard";



export const BUILD_YOUR_PC_ROUTES: Routes = [

    {
        path: 'Linea', loadComponent: () =>
            import("./vs/build-your-pc-vs.component").then(c => c.BuildYourPcVsComponent)
    },
    {
        path :':section', loadComponent: () =>
            import("./build-your-pc.component").then(c => c.BuildYourPcComponent),
        canActivate: [combinedGuard],
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'Linea',
    },
    {
        path: '**',
        redirectTo: 'Linea', // Redirige cualquier ruta no válida dentro de 'build-your-pc' a 'Linea'
    },
];


