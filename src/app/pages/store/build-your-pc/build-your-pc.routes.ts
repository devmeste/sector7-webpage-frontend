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
        path: 'Linea', loadComponent: () =>
            import("./vs/build-your-pc-vs.component").then(c => c.BuildYourPcVsComponent)
    },
    {
        path: '',
        loadComponent: () =>
            import("./build-your-pc.component").then(c => c.BuildYourPcComponent),
        children: [
            {
                path: 'procesadores',
                loadComponent: () => import("./cards-children/procesadores/procesadores.component").then(c => c.ProcesadoresComponent),

            },
            {
                path: 'Procesadores',
                loadComponent: () => import("./cards-children/procesadores/procesadores.component").then(c => c.ProcesadoresComponent),

            },
            {
                path: 'mothers',
                loadComponent: () => import("./cards-children/mothers/mothers.component").then(c => c.MothersComponent),
            },
            {
                path: 'Mothers',
                loadComponent: () => import("./cards-children/mothers/mothers.component").then(c => c.MothersComponent),
            },
            {
                path: 'memorias',
                loadComponent: () => import("./cards-children/memorias/memorias.component").then(c => c.MemoriasComponent),
            },
            {
                path: 'Memorias',
                loadComponent: () => import("./cards-children/memorias/memorias.component").then(c => c.MemoriasComponent),
            },
            {
                path: 'almacenamiento',
                loadComponent: () => import("./cards-children/memorias/memorias.component").then(c => c.MemoriasComponent),
            },
            {
                path: 'Almacenamiento',
                loadComponent: () => import("./cards-children/memorias/memorias.component").then(c => c.MemoriasComponent),
            },
            {
                path: 'fuentes',
                loadComponent: () => import("./cards-children/memorias/memorias.component").then(c => c.MemoriasComponent),
            },
            {
                path: 'Fuentes',
                loadComponent: () => import("./cards-children/memorias/memorias.component").then(c => c.MemoriasComponent),
            },
            {
                path: 'placas de video',
                loadComponent: () => import("./cards-children/memorias/memorias.component").then(c => c.MemoriasComponent),
            },
            {
                path: 'Placas de video',
                loadComponent: () => import("./cards-children/memorias/memorias.component").then(c => c.MemoriasComponent),
            },
            {
                path: 'refrigeracion',
                loadComponent: () => import("./cards-children/memorias/memorias.component").then(c => c.MemoriasComponent),
            },
            {
                path: 'Refrigeracion',
                loadComponent: () => import("./cards-children/memorias/memorias.component").then(c => c.MemoriasComponent),
            },
            {
                path: 'monitores',
                loadComponent: () => import("./cards-children/memorias/memorias.component").then(c => c.MemoriasComponent),
            },
            {
                path: 'Monitores',
                loadComponent: () => import("./cards-children/memorias/memorias.component").then(c => c.MemoriasComponent),
            },
            {
                path: 'gabinetes',
                loadComponent: () => import("./cards-children/memorias/memorias.component").then(c => c.MemoriasComponent),
            },
            {
                path: 'Gabinetes',
                loadComponent: () => import("./cards-children/memorias/memorias.component").then(c => c.MemoriasComponent),
            },
            {
                path: 'auriculares',
                loadComponent: () => import("./cards-children/memorias/memorias.component").then(c => c.MemoriasComponent),
            },
            {
                path: 'Auriculares',
                loadComponent: () => import("./cards-children/memorias/memorias.component").then(c => c.MemoriasComponent),
            },
            {
                path: 'teclados',
                loadComponent: () => import("./cards-children/memorias/memorias.component").then(c => c.MemoriasComponent),
            },
            {
                path: 'Teclados',
                loadComponent: () => import("./cards-children/memorias/memorias.component").then(c => c.MemoriasComponent),
            },
            {
                path: 'mouses',
                loadComponent: () => import("./cards-children/memorias/memorias.component").then(c => c.MemoriasComponent),
            },
            {
                path: 'Mouses',
                loadComponent: () => import("./cards-children/memorias/memorias.component").then(c => c.MemoriasComponent),
            },

        ]
    },
    {
        path: ':section', loadComponent: () =>
            import("./build-your-pc.component").then(c => c.BuildYourPcComponent),
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