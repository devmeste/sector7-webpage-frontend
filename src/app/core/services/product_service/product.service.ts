import { inject, Injectable } from '@angular/core';
import { IProduct } from '../../models/product';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import BKProduct from 'app/core/models/BKProduct';
import { ProductResponse } from 'app/core/models/ProductResponse';
import { environment } from 'app/core/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl: string = environment.apiUrl;
  _httpClient: HttpClient = inject(HttpClient);

  products: IProduct[] = [
    {
      id: "1", name: 'Procesador AMD RYZEN 3 3200G 4.0GHz Turbo + Radeon Vega 8 AM4 Wraith Stealth Cooler', description: 'Product 1 description',
      imgs: ['../../../../assets/images/products/product-detail-1.png', '../../../../assets/images/products/product-detail-2.png',
        '../../../../assets/images/products/product-detail-3.png', '../../../../assets/images/products/product-detail-4.png',
        '../../../../assets/images/products/product-detail-5.png',
      ], price: 1000, stock: 10
    },

    {
      id: "2", name: 'Procesador AMD RYZEN 3 3200G 4.0GHz Turbo + Radeon Vega 8 AM4 Wraith Stealth Cooler', description: 'Product 2 description',
      imgs: ['../../../../assets/images/products/product.png'], price: 1000, stock: 10
    },

    {
      id: "3", name: 'Procesador AMD RYZEN 3 3200G 4.0GHz Turbo + Radeon Vega 8 AM4 Wraith Stealth Cooler', description: 'Product 3 description',
      imgs: ['../../../../assets/images/products/product.png'], price: 1000, stock: 10
    },

    {
      id: "4", name: 'Procesador AMD RYZEN 3 3200G 4.0GHz Turbo + Radeon Vega 8 AM4 Wraith Stealth Cooler', description: 'Product 4 description',
      imgs: ['../../../../assets/images/products/product.png'], price: 1000, stock: 10
    },

    {
      id: "5", name: 'Procesador AMD RYZEN 3 3200G 4.0GHz Turbo + Radeon Vega 8 AM4 Wraith Stealth Cooler', description: 'Product 5 description',
      imgs: ['../../../../assets/images/products/product.png'], price: 1000, stock: 10
    },

    {
      id: "6", name: 'Procesador AMD RYZEN 3 3200G 4.0GHz Turbo + Radeon Vega 8 AM4 Wraith Stealth Cooler', description: 'Product 6 description',
      imgs: ['../../../../assets/images/products/product.png'], price: 1000, stock: 10
    },

    {
      id: "7", name: 'Procesador AMD RYZEN 3 3200G 4.0GHz Turbo + Radeon Vega 8 AM4 Wraith Stealth Cooler', description: 'Product 7 description',
      imgs: ['../../../../assets/images/products/product.png'], price: 1000, stock: 10
    },

    {
      id: "8", name: 'Procesador AMD RYZEN 3 3200G 4.0GHz Turbo + Radeon Vega 8 AM4 Wraith Stealth Cooler', description: 'Product 8 description',
      imgs: ['../../../../assets/images/products/product.png'], price: 1000, stock: 10
    },

    {
      id: "9", name: 'Procesador AMD RYZEN 3 3200G 4.0GHz Turbo + Radeon Vega 8 AM4 Wraith Stealth Cooler', description: 'Product 9 description',
      imgs: ['../../../../assets/images/products/product.png'], price: 1000, stock: 10
    },
    {
      id: "10", name: 'Procesador AMD RYZEN 3 3200G 4.0GHz Turbo + Radeon Vega 8 AM4 Wraith Stealth Cooler', description: 'Product 9 description',
      imgs: ['../../../../assets/images/products/product.png'], price: 1000, stock: 10
    },

  ];

  private products$: BehaviorSubject<IProduct[]> = new BehaviorSubject<IProduct[]>(this.products);


  constructor() { }

  public getProducts(): Observable<ProductResponse> {
    return this._httpClient.get<ProductResponse>(`${this.baseUrl}products`);
  }

  public addProduct(p: IProduct) {
    this.products.push(p);
    this.products$.next(this.products);
  }

  public getProductById(id: string) {
    // return this.products.find(product => product.id === id);
    return this._httpClient.get<BKProduct>(`${this.baseUrl}products/${id}`);
  }


  search(value: string): Observable<ProductResponse> {
    return this._httpClient.get<ProductResponse>(`${this.baseUrl}products?title=${value}&page=1`);
  }


}
