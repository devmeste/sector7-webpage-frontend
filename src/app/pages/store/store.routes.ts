import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";

export const STORE_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./home/home.component').then(r => r.HomeComponent),
        // loadComponent: () =>import("./search/search.component").then(c => c.SearchComponent)
    },
    {
        path: 'build-your-pc',
        loadComponent: () =>
            import("./build-your-pc/build-your-pc.component").then(c => c.BuildYourPcComponent)
    },
    {
        path: 'product-details/:id', 
        loadComponent: () =>
            import("./product-details/product-details.component").then(c => c.ProductDetailsComponent)
    },
    {
        path: 'search', 
        loadComponent: () =>
            import("./search/search.component").then(c => c.SearchComponent)
    },
    {
        path: 'search/:textToSearch', 
        loadComponent: () =>
            import("./search/search.component").then(c => c.SearchComponent)
    },
    {
        path: 'cart', 
        loadComponent: () =>
            import("./shopping-cart/shopping-cart.component").then(c => c.ShoppingCartComponent)
    },
    {
        path: 'buying/delivery-method', 
        loadComponent: () =>
            import("./purchase/choice-delivery-method/choice-delivery-method.component").then(c => c.ChoiceDeliveryMethodComponent)
    },
]