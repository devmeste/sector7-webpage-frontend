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