import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, map, of, take, tap } from 'rxjs';
import ICategory from '../../models/ICategory';
import Field from 'app/core/models/Field';
import { ProductResponse } from 'app/core/models/ProductResponse';
import { Usd } from 'app/core/models/Usd';
import IField from 'app/core/models/Field';
import BKProduct from 'app/core/models/BKProduct';

@Injectable({
    providedIn: 'root'
})

export class AdminService {









    baseUrl: string = 'http://localhost:8001/';

    private _router: Router = inject(Router);
    private _httpClient: HttpClient = inject(HttpClient);

    constructor() {

    }

    // CATEGORIES
    getAllCategories(): Observable<ICategory[]> {
        return this._httpClient.get<ICategory[]>(this.baseUrl + 'categories');
    };

    getCategoryById(categoryId: string): Observable<ICategory> {
        return this._httpClient.get<ICategory>(this.baseUrl + 'categories/' + categoryId).pipe(
            tap(console.log)
        );
    }


    createCategory(name: string, component: boolean, fields: Field[]){

        let array_with_just_string_names: string[] = [];
        fields.forEach(field => array_with_just_string_names.push(field.name));

        let body = {
            name,
            component,
            fields: array_with_just_string_names
        }
        console.log(body);

        return this._httpClient.post(this.baseUrl + 'categories', body);
    }

    deleteCategory(id: string) {
        console.log(id);
        return this._httpClient.delete(this.baseUrl + 'categories/' + id, {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' },

            )
        });
    }

    //PRODUCTS
    getAllProducts(): Observable<ProductResponse> {
        return this._httpClient.get<ProductResponse>(this.baseUrl + 'products');
    }

    createProduct(product: any): Observable<BKProduct> {

        return this._httpClient.post<any>(this.baseUrl + 'products', product);
    }

    deleteProduct(id: string): Observable<boolean> {
        return this._httpClient.delete(this.baseUrl + 'products/' + id).pipe(
            map(() => true),
            catchError(() => of(false))
        );
    }


    //USD
    getAllUsd(): Observable<Usd[]> {
        return this._httpClient.get<Usd[]>(this.baseUrl + 'usd');
    }

    deleteUsd(id: string): Observable<void> {
        return this._httpClient.delete<void>(this.baseUrl + 'usd/' + id);
    }

    createUsd(price: number): Observable<Usd> {

        let body = { price };

        return this._httpClient.post<Usd>(this.baseUrl + 'usd', body);
    }

    // FIELDS

    getAllFields(): Observable<IField[]> {
        return this._httpClient.get<IField[]>(this.baseUrl + 'fields');
    }
}
