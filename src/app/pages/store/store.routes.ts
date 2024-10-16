import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { userGuard } from "app/core/guards/user-guard/user.guard";
import { combinedGuard } from "app/core/guards/combined-guard/combined.guard";

export const STORE_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./home/home.component').then(r => r.HomeComponent),
    },
    {
        path: 'build-your-pc',
        loadChildren: () =>
            import("./build-your-pc/build-your-pc.routes").then(r => r.BUILD_YOUR_PC_ROUTES)
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
        path: 'user-account/verify',
        loadComponent: () =>
            import("./user/user-verification/user-verification.component").then(c => c.UserVerificationComponent)
    },
    {
        path: 'buying/delivery-method',
        loadComponent: () =>
            import("./purchase/choice-delivery-method/choice-delivery-method.component").then(c => c.ChoiceDeliveryMethodComponent),
        canActivate: [combinedGuard]
    },
    {
        path: 'buying/:deliveryMethod/payment-method',
        loadComponent: () =>
            import("./purchase/payment-method/payment-method.component").then(c => c.PaymentMethodComponent),
        canActivate: [combinedGuard]
    },
    {
        path:'purchase-success',
        loadComponent: () =>
            import("./purchase/purchase-success/purchase-success.component").then(c => c.PurchaseSuccessComponent),
        canActivate: [combinedGuard]

    },
    {
        path: 'buying/:deliveryMethod/payment-method/:paymentMethod/confirm-purchase',
        loadComponent: () =>
            import("./purchase/confirm-purchase/confirm-purchase.component").then(c => c.ConfirmPurchaseComponent),
        canActivate: [combinedGuard]
    },
    {
        path: 'user-account',
        loadComponent: () => import("./user/user-account/user-account.component").then(c => c.UserAccountComponent),
        canActivate: [userGuard],
        children: [
            {
                path: 'profile',
                loadComponent: () => import("./user/user-profile/user-profile.component").then(c => c.UserProfileComponent)
            },
            {
                path: 'orders',
                loadComponent: () => import("./user/user-orders/user-orders.component").then(c => c.UserOrdersComponent)
            },
            {
                path: 'change-password',
                loadComponent: () => import("./user/user-password/user-password.component").then(c => c.UserPasswordComponent)
            },
            {
                path: 'favorites',
                loadComponent: () => import("./user/user-favorites/user-favorites.component").then(c => c.UserFavoritesComponent)
            }
        ]
    },
    {
        path: 'error',
        loadComponent: () =>
            import("../../shared/components/an-error-has-ocurred/an-error-has-ocurred.component").then(c => c.AnErrorHasOcurredComponent)   
    }
]