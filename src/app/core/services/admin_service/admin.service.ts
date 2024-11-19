import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, map, of, take, tap, throwError } from 'rxjs';
import { ICategory, BKICategory } from '../../models/ICategory';
import Field from 'app/core/models/Field';
import { ProductResponse } from 'app/core/models/ProductResponse';
import { Usd } from 'app/core/models/Usd';
import IField from 'app/core/models/Field';
import BKProduct from 'app/core/models/BKProduct';
import { IAccount, IAccountReq } from 'app/core/models/IAccount';
import { IPurchase } from 'app/core/models/IPurchase';
import { IPurchasesBetweenDatesResponse } from 'app/core/models/IPurchasesBetweenDatesResponse';
import { environment } from 'app/core/environments/environment';
import { ISocket } from 'app/core/models/ISocket';
import { IGeneration } from 'app/core/models/IGeneration';
import { IMemoryType } from 'app/core/models/IMemoryType';
import { IBanner, IBannerRequest } from 'app/core/models/IBanner';
import { IFinalizePurchaseDTO } from 'app/pages/admin/children_pages/Bills/pop-up-finalize-purchase/pop-up-finalize-purchase.component';
import { IPurchaseFilteredRequestDTO } from 'app/pages/admin/children_pages/Bills/get-all-bills/get-all-bills.component';

@Injectable({
    providedIn: 'root'
})

export class AdminService {





    // baseUrl: string = 'http://localhost:8001/api/v1/es/';
    private baseUrl: string = environment.apiUrl;

    private _router: Router = inject(Router);
    private _httpClient: HttpClient = inject(HttpClient);

    // categories
    getAllCategories(): Observable<ICategory[]> {
        return this._httpClient.get<ICategory[]>(this.baseUrl + 'categories');
    };

    getCategoryById(categoryId: string): Observable<BKICategory> {
        return this._httpClient.get<BKICategory>(this.baseUrl + 'categories/' + categoryId);
    }


    createCategory(name: string, fields: Field[]) {

        let array_with_just_string_names: string[] = [];
        fields.forEach(field => array_with_just_string_names.push(field.name));

        let body = {
            name,
            fields: array_with_just_string_names
        }

        return this._httpClient.post(this.baseUrl + 'categories', body);
    }

    updateCategoryName(category_id: string, name: string): Observable<BKICategory> {

        return this._httpClient.patch<BKICategory>(this.baseUrl + 'categories/' + category_id, { name });
    }


    updateCategory(id: string, name: string, fields: Field[]): Observable<ICategory> {

        let array_with_just_string_names: string[] = fields.map(element => {
            return element.name;
        });


        let body = {
            name,
            fields: array_with_just_string_names
        }

        return this._httpClient.put<ICategory>(this.baseUrl + 'categories/' + id, body);
    }

    deleteCategory(id: string) {
        return this._httpClient.delete(this.baseUrl + 'categories/' + id, {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' },

            )
        });
    }

    // products

    getAllProducts(): Observable<ProductResponse> {
        return this._httpClient.get<ProductResponse>(this.baseUrl + 'products');
    }

    getAllProductsForAdmin(currentPage: number,  text?: string): Observable<ProductResponse> {

        let url = `${this.baseUrl}products/actual?page=${currentPage}`

        if (text) {
            url = `${this.baseUrl}products/actual?page=${currentPage}&title=${text}`;
        }

        return this._httpClient.get<ProductResponse>(url);
    }


    getProductById(id: string): Observable<BKProduct> {
        return this._httpClient.get<BKProduct>(this.baseUrl + 'products/actual/' + id);
    }


    createProduct(product: any): Observable<any> {
        console.log("Create Product en Admin Service: ", product);
        return this._httpClient.post<any>(this.baseUrl + 'products', product).pipe(
            tap(() => { "Se Ejecuto Locoooooo" }),
        );
    }

    updateProduct(p: any) {
        console.log("Update Product en Admin Service: ", p);
        return this._httpClient.put<any>(this.baseUrl + 'products/' + p.id, p);
    }

    deleteProduct(id: string): Observable<boolean> {
        return this._httpClient.delete(this.baseUrl + 'products/' + id).pipe(
            map(() => true),
            catchError(() => of(false))
        );
    }

    getAllEnabledProducts(option: string , page : number = 1 , text?: string): Observable<ProductResponse> {
        if (option === 'enabled') {
            option = '1';
        }
        else if (option === 'disabled') {
            option = '0';
        }
        else {
            return throwError(() => new Error('Invalid option'))
        }

        if (text) {
            return this._httpClient.get<ProductResponse>(this.baseUrl + 'products/visible/' + option + '?page=' + page + '&title=' + text);
        }

        return this._httpClient.get<ProductResponse>(this.baseUrl + 'products/visible/' + option + '?page=' + page);
    }


    sendUpdateEnableProducts(ids: string[], option: string) {

        if (option === 'enabled') {
            option = 'hide';
        } else if (option === 'disabled') {
            option = 'show';
        } else {
            throwError(() => new Error('Invalid option'))
        }

        let body = {
            ids: ids,
        }

        return this._httpClient.patch(this.baseUrl + 'products/status/' + option, body);
    }

    getAllProductsPending() {
        return this._httpClient.get<ProductResponse>(this.baseUrl + 'products/pending');
    }


    // usd

    getAllUsd(): Observable<Usd[]> {
        return this._httpClient.get<Usd[]>(this.baseUrl + 'usd?page=1');
    }

    deleteUsd(id: string): Observable<void> {
        return this._httpClient.delete<void>(this.baseUrl + 'usd/' + id);
    }

    createUsd(price: number): Observable<Usd> {

        let body = { price };

        return this._httpClient.post<Usd>(this.baseUrl + 'usd', body);
    }

    // fields

    // getAllFields(): Observable<IField[]> {
    //     return this._httpClient.get<IField[]>(this.baseUrl + 'fields');
    // }


    // accounts

    getAllAccounts(): Observable<IAccount[]> {
        return this._httpClient.get<IAccount[]>(this.baseUrl + 'user');
    }

    createAccount(value: IAccountReq): Observable<IAccount> {
        return this._httpClient.post<IAccount>(this.baseUrl + 'admin/register', value);
    }

    changeStateAccount(username: string, change: boolean) {
        let body = {
            username,
            enabled: !change
        }
        return this._httpClient.patch(this.baseUrl + 'admin/change-status', body);
    }

    deleteAccount(username: string){
        return this._httpClient.delete(this.baseUrl + `admin/${username}`);
    }

    // purchases
    getAllPurchases( filters : IPurchaseFilteredRequestDTO): Observable<IPurchase[]> {

        let params = new HttpParams();

        if(filters.since) {
            params = params.set('since', filters.since); // Reassign params
        }

        if(filters.until) {
            params = params.set('until', filters.until); // Reassign params
        }

        if(filters.paymentAccredited==false){
            params = params.set('payment-accredited', filters.paymentAccredited); // Reassign params
        }
        else if(filters.paymentAccredited == true && filters.confirmed == false){
            params = params.set('payment-accredited', filters.paymentAccredited); // Reassign params
            params = params.set('confirmed', filters.confirmed); // Reassign params
        }

        console.log(' params',params);

        return this._httpClient.get<IPurchase[]>(this.baseUrl + 'purchase', {params});

    }

    getPurchaseById(purchaseId: any) {
        return this._httpClient.get<IPurchase>(this.baseUrl + 'purchase/' + purchaseId);
    }

    cancelPurchase(purchase_id: string) : Observable<null> {
        return this._httpClient.delete<null>(this.baseUrl + 'purchase/' + purchase_id);
    }
    
    finalizePurchase(finalizePurchaseDTO : IFinalizePurchaseDTO): Observable<any> {
        let body = {
            trackId: finalizePurchaseDTO.trackId,
            expeditor: finalizePurchaseDTO.expeditor,
        }
        console.log("finalizePurchaseDTO" , finalizePurchaseDTO);
        // console.log("body ", body);
        return this._httpClient.post<any>(this.baseUrl + 'purchase/finalize/' + finalizePurchaseDTO.id , body );
    }
  
    getAllShipmentStatus(): Observable<IShipmentStatusResponse> {
        return this._httpClient.get<IShipmentStatusResponse>(this.baseUrl + 'purchase/status');
    }

    editPurchase(purchaseId: string, formValue  : any) {
        
        const { shipmentStatus, trackId, expeditor, makePaymentAccredited, makeLocalPayment } = formValue;

        const body = {
            "status": shipmentStatus,
            trackId,
            expeditor,
            makePaymentAccredited,
            makeLocalPayment
        }

        return this._httpClient.patch(this.baseUrl + 'purchase/' + purchaseId, body);

    }

    // sockets

    createSocket(type: string): Observable<ISocket> {
        return this._httpClient.post<ISocket>(this.baseUrl + 'socket', { type });
    }

    getAllSockets() {
        return this._httpClient.get<ISocket[]>(this.baseUrl + 'socket');
    }

    getSocketById(socket_id: string) {
        return this._httpClient.get<ISocket>(this.baseUrl + 'socket/' + socket_id);
    }

    updateSocket(socket_id: string, type: string) {
        return this._httpClient.put<ISocket>(this.baseUrl + 'socket/' + socket_id, { type });
    }

    deleteScocket(id: string) {
        return this._httpClient.delete<any>(this.baseUrl + 'socket/' + id);
    }

    // generations
    createGeneration(type: string): Observable<IGeneration> {
        return this._httpClient.post<IGeneration>(this.baseUrl + 'generation', { type });
    }

    getAllGenerations(): Observable<IGeneration[]> {
        return this._httpClient.get<IGeneration[]>(this.baseUrl + 'generation');
    }

    getGenerationById(id: string) {
        return this._httpClient.get<IGeneration>(this.baseUrl + 'generation/' + id);
    }

    deleteGeneration(id: string) {
        return this._httpClient.delete<IGeneration>(this.baseUrl + 'generation/' + id);
    }

    updateGeneration(id: string, type: string): Observable<IGeneration> {
        return this._httpClient.put<IGeneration>(this.baseUrl + 'generation/' + id, { type });
    }



    // memory-types
    createMemoryType(type: string): Observable<IMemoryType> {
        return this._httpClient.post<IMemoryType>(this.baseUrl + 'memory', { type });
    }

    getAllMemoryTypes(): Observable<IMemoryType[]> {
        return this._httpClient.get<IMemoryType[]>(this.baseUrl + 'memory');

    }

    getMemoryTypeById(id: string) {
        return this._httpClient.get<IMemoryType>(this.baseUrl + 'memory/' + id);
    }

    deleteMemoryType(id: string) {
        return this._httpClient.delete<IMemoryType>(this.baseUrl + 'memory/' + id);
    }

    updateMemoryType(id: string, type: string): Observable<IMemoryType> {
        return this._httpClient.put<IMemoryType>(this.baseUrl + 'memory/' + id, { type });
    }


    // banners
    getAllBanners(): Observable<IBanner[]> {
        return this._httpClient.get<IBanner[]>(this.baseUrl + 'banners');
    }
    getBannerById(element_id: string) {
        return this._httpClient.get<IBanner>(this.baseUrl + 'banners/' + element_id);
    }

    updateBanner(banner: IBannerRequest, element_id: string) {
        return this._httpClient.put<IBannerRequest>(this.baseUrl + 'banners/' + element_id, banner);
    }
}


export interface IShipmentStatusResponse {
    status: String[]
}