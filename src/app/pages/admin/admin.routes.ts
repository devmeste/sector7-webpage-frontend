import { Routes } from "@angular/router";

export const ADMIN_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./admin-dashboard/admin-dashboard.component').then(r => r.AdminDashboardComponent),
        children: [
            {
                path: 'category/new',
                loadComponent: ()=> import('./children_pages/category/create-category/create-category.component').then(r => r.CreateCategoryComponent)
            },
            {
                path: 'category',
                loadComponent: ()=> import('./children_pages/category/get-all-categories/get-all-categories.component').then(r => r.GetAllCategoriesComponent)
            },
            {
                path: 'products',
                loadComponent: ()=>import('./children_pages/products/get-all-products/get-all-products/get-all-products.component').then(r => r.GetAllProductsComponent)
            },
            {
                path: 'products/new',
                loadComponent:()=>import('./children_pages/products/create-product/create-product.component').then(c=>c.CreateProductComponent)
            },
            {
                path: 'products/enable',
                loadComponent:()=>import('./children_pages/products/enable-products/enable-products.component').then(c=>c.EnableProductsComponent)
            },
            {
                path: 'usd',
                loadComponent: ()=>import('./children_pages/usd/get-all-usd/get-all-usd.component').then(r => r.GetAllUsdComponent)
            },
            {
                path: 'usd/new',
                loadComponent: ()=>import('./children_pages/usd/create-usd/create-usd.component').then(r => r.CreateUsdComponent)
            },
            {
                path: 'accounts',
                loadComponent: ()=>import('./children_pages/accounts/get-all-accounts/get-all-accounts.component').then(r => r.GetAllAccountsComponent)
            },
            {
                path: 'accounts/new',
                loadComponent: ()=>import('./children_pages/accounts/create-account/create-account.component').then(r => r.CreateAccountComponent)
            },
            {
                path: 'billing',
                loadComponent: ()=>import('./children_pages/Bills/get-all-bills/get-all-bills.component').then(r=> r.GetAllBillsComponent) 
            },
            {
                path: 'billing/:id',
                loadComponent: ()=>import('./children_pages/Bills/purchase-details/purchase-details.component').then(r=> r.PurchaseDetailsComponent) 
            }

        ]
    },

]