import { HttpClient, HttpHeaders } from '@angular/common/http';
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


    createCategory(name: string, component: boolean, fields: Field[]) {

        let array_with_just_string_names: string[] = [];
        fields.forEach(field => array_with_just_string_names.push(field.name));

        let body = {
            name,
            component,
            fields: array_with_just_string_names
        }

        return this._httpClient.post(this.baseUrl + 'categories', body);
    }

    updateCategoryName(category_id: string, name: string): Observable<BKICategory> {

        return this._httpClient.patch<BKICategory>(this.baseUrl + 'categories/' + category_id, { name });
    }


    updateCategory(id: string, name: string, component: boolean, fields: Field[]): Observable<ICategory> {

        let array_with_just_string_names: string[] = fields.map(element => {
            return element.name;
        });


        let body = {
            name,
            component,
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

    getAllProductsForAdmin(currentPage: number, pageSize: number, text?: string): Observable<ProductResponse> {

        let url = `${this.baseUrl}products/actual?page=${currentPage}`

        if (text) {
            url = `${this.baseUrl}products/actual?page=${currentPage}&title=${text}`;
        }

        return this._httpClient.get<ProductResponse>(url);
    }


    getProductById(id: string): Observable<BKProduct> {
        return this._httpClient.get<BKProduct>(this.baseUrl + 'products/' + id);
    }


    createProduct(product: any): Observable<any> {
        return this._httpClient.post<any>(this.baseUrl + 'products', product);
    }

    updateProduct(p: any) {
        return this._httpClient.put<any>(this.baseUrl + 'products/' + p.id, p);
    }

    deleteProduct(id: string): Observable<boolean> {
        return this._httpClient.delete(this.baseUrl + 'products/' + id).pipe(
            map(() => true),
            catchError(() => of(false))
        );
    }

    getAllEnabledProducts(option: string): Observable<ProductResponse> {
        if (option === 'enabled') {
            option = '1';
        }
        else if (option === 'disabled') {
            option = '0';
        }
        else {
            return throwError(() => new Error('Invalid option'))
        }

        return this._httpClient.get<ProductResponse>(this.baseUrl + 'products/visible/' + option);
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

    getAllFields(): Observable<IField[]> {
        return this._httpClient.get<IField[]>(this.baseUrl + 'fields');
    }


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
            status: !change
        }
        return this._httpClient.patch(this.baseUrl + 'admin/change-status', body);
    }


    // purchases
    getAllPurchases() {
        return this._httpClient.get<IPurchase[]>(this.baseUrl + 'purchase');
    }

    getAllPurchasesBetweenDates(startDate: string, endDate: string): Observable<IPurchasesBetweenDatesResponse> {
        return this._httpClient.get<IPurchasesBetweenDatesResponse>(this.baseUrl + 'purchase/bill?since=' + startDate + '&until=' + endDate);
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

}


