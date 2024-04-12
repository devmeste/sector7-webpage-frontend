import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    {
        path: '', component: HomeComponent
    },
    {
        path: 'build-your-pc', 
        loadComponent:()=>
            import("./pages/build-your-pc/build-your-pc.component").then(c=>c.BuildYourPcComponent)
    },
    {
        path: 'product-details/:id',  loadComponent:()=>
            import("./pages/product-details/product-details.component").then(c=>c.ProductDetailsComponent)
    },
    {
        path: 'search',  loadComponent:()=>
            import("./pages/search/search.component").then(c=>c.SearchComponent)
    },
    {
        path: 'search/:category',  loadComponent:()=>
            import("./pages/search/search.component").then(c=>c.SearchComponent)
    },
    {
        path: 'cart',  loadComponent:()=>
            import("./pages/shopping-cart/shopping-cart.component").then(c=>c.ShoppingCartComponent)
    },
];
