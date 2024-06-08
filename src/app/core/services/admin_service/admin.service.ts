import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import ICategory from '../../models/ICategory';
import Field from 'app/core/models/Field';
import { ProductResponse } from 'app/core/models/ProductResponse';
import { Usd } from 'app/core/models/Usd';

@Injectable({
    providedIn: 'root'
})

export class AdminService {



    baseUrl: string = 'http://localhost:8001/';

    private _router: Router = inject(Router);
    private _httpClient: HttpClient = inject(HttpClient);

    constructor() {

    }

    getAllCategories(): Observable<ICategory[]> {
        return this._httpClient.get<ICategory[]>(this.baseUrl + 'categories');
    };


    createCategory(name: string, component: boolean, fields: Field[]) {
        console.log(fields);
        let array_with_just_string_names: string[] = [];
        fields.forEach(field => array_with_just_string_names.push(field.name));

        let body = {
            name,
            component,
            fields: array_with_just_string_names
        }

        this._httpClient.post(this.baseUrl + 'categories', body,
        ).subscribe(response => {
            console.log(response);
            return response;
        })
    }

    deleteCategory(id: string) {
        console.log(id);
        return this._httpClient.delete(this.baseUrl + 'categories/' + id, {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' },

            )
        });
    }


    getAllProducts(): Observable<ProductResponse> {
        return this._httpClient.get<ProductResponse>(this.baseUrl + 'products');
    }

    //USD
    getAllUsd(): Observable<Usd[]> {
        return this._httpClient.get<Usd[]>(this.baseUrl + 'usd');
    }

    deleteUsd(id: string) : Observable<any> {
        return this._httpClient.delete(this.baseUrl + 'usd/' + id);
    }

}
