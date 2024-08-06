import { Routes } from "@angular/router";


const loadMainView = () =>
    import("./build-your-pc-cards-content/build-your-pc-cards-content.component")
        .then(m => m.BuildYourPcCardsContentComponent);


export const BUILD_YOUR_PC_ROUTES: Routes = [

    {
        path: 'vs',
        loadComponent: () =>
            import("./vs/build-your-pc-vs.component").then(c => c.BuildYourPcVsComponent),
    }, 
    {
        path: '',
        loadComponent: () =>
            import("./build-your-pc.component").then(c => c.BuildYourPcComponent),
        children: [
            {
                path: 'procesadores',loadComponent: loadMainView
            },
            {
                path: 'mothers', loadComponent: loadMainView
            },
            {
                path: 'memoria_RAM',loadComponent: loadMainView
            },
            {
                path: 'Almacenamiento',loadComponent: loadMainView
            },
            {
                path: 'Fuentes',loadComponent: loadMainView
            },
            {
                path: 'Placas_de_video',loadComponent: loadMainView
            },
            {
                path: 'Refrigeracion',loadComponent: loadMainView
            },
            {
                path: 'Monitores',loadComponent: loadMainView
            },
            {
                path: 'Auriculares',loadComponent: loadMainView
            },
            {
                path: 'Gabinetes',loadComponent: loadMainView
            },
            {
                path: 'Teclados',loadComponent: loadMainView
            },
            {
                path: 'Mouses',loadComponent: loadMainView
            },
            {
                path: '',
                redirectTo: 'procesadores',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '**',
        redirectTo: ''
    },
];

// Processor / Procesadores

// Motherboard / Mothers

// Memory RAM / Memoria RAM

// Storage device / Almacenamiento

// Power suply / Fuentes

// Video card / Placas de video

// Cooling system / Refrigeracion

// Monitor / Monitores

// Headset / Auriculares

// Case / Gabinetes

// Keyboard / Teclados

// Mouse / Mouses

// const urlsChildren = ['procesadores','mothers'];
// const childrens = () => urlsChildren.map(url => ({
//     path: url, loadComponent: loadMainView
// }))