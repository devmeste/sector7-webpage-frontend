import { Routes } from "@angular/router";

export const BUILD_YOUR_PC_ROUTES: Routes = [

    {
        path: '',
        loadComponent: () =>
            import("./build-your-pc.component").then(c => c.BuildYourPcComponent),
        // children: [
        //     {
        //         path: '',
        //         loadComponent: () =>
        //             import("./build-your-pc-cards-content/build-your-pc-cards-content.component").then(c => c.BuildYourPcCardsContentComponent)
        //     }
        // ]
        // Processor

        // Motherboard

        // Memory RAM

        // Storage device

        // Power suply

        // Video card

        // Cooling system

        // Monitor

        // Headset

        // Keyboard

        // Mouse 
    },

    {
        path: 'vs',
        loadComponent: () =>
            import("./vs/build-your-pc-vs.component").then(c => c.BuildYourPcVsComponent)
    },

];
