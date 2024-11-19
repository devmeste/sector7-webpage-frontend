import { inject, Injectable } from '@angular/core';
import { IProduct } from '../../models/product';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import BKProduct from 'app/core/models/BKProduct';
import { ProductResponse } from 'app/core/models/ProductResponse';
import { environment } from 'app/core/environments/environment';
import { ICondition } from 'app/core/models/ICondition';
import { IGetAllBrandsResponse } from 'app/core/models/htpp_responses/IGetAllBrandsResponses';
import { IFiltersForSearch } from 'app/core/models/filters/IFiltersForSearch';

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


  search(value: string , page ?:number , brand ?: string): Observable<ProductResponse> {

    // if(page && brand) {
    //   return this._httpClient.get<ProductResponse>(`${this.baseUrl}products?title=${value}&page=${page}&brand=${brand}`)
    // };

    // if(brand) {
    //   return this._httpClient.get<ProductResponse>(`${this.baseUrl}products?title=${value}&brand=${brand}`);
    // }
    
    if(page) return this._httpClient.get<ProductResponse>(`${this.baseUrl}products?title=${value}&page=${page}`);
    
    return this._httpClient.get<ProductResponse>(`${this.baseUrl}products?title=${value}&page=1`);
  }

  getAllProductsByCategory(category: string , title ?: string) {

    if(title) return this._httpClient.get<ProductResponse>(`${this.baseUrl}products?category=${category}&title=${title}&page=1`);
    
    return this._httpClient.get<ProductResponse>(`${this.baseUrl}products?category=${category}&page=1`);
  }

  getAllProductsBySocketAndGeneration(category: string, socket: string, generation: string) {
    return this._httpClient.get<ProductResponse>(`${this.baseUrl}products/category/${category}/socket/${socket}/generation/${generation}`);
  }

  getAllMemoriesByType(type: string) {
    return this._httpClient.get<ProductResponse>(`${this.baseUrl}products/memories/${type}`);
  }

  checkCompatibility(firstID: string | null, secondID: string) : Observable<ICondition> {
    return this._httpClient.get<ICondition>(`${this.baseUrl}products/check?ids=${firstID},${secondID}`);
  }

  getAllProducts( sincePrice ?: number, untilPrice ?: number) {

    if(sincePrice && untilPrice){
      return this._httpClient.get<ProductResponse>(`${this.baseUrl}products?price=min:${sincePrice},max:${untilPrice}`);
    }else if (sincePrice) {
      return this._httpClient.get<ProductResponse>(`${this.baseUrl}products?price=min:${sincePrice}`);
    }else if (untilPrice) {
      return this._httpClient.get<ProductResponse>(`${this.baseUrl}products?price=max:${untilPrice}`);
    }
    return this._httpClient.get<ProductResponse>(`${this.baseUrl}products`);

  }

  getAllProductsWithFilters(page: number, filters: IFiltersForSearch) {

    let params = new HttpParams().set('page', page.toString())

    if(filters.brand){
      params = params.set('brand', filters.brand);
    }

    if(filters.category){
      params = params.set('category', filters.category);
    }

    if(filters.text){
      params = params.set('title', filters.text);
    }

    if(filters.order.name && filters.order.direction) {
      params = params.set('sort', filters.order.name);
      params = params.set('order', filters.order.direction);
    }

    if(filters.price.since && filters.price.until){
      params = params.set('price', `min:${filters.price.since},max:${filters.price.until}`);
    }else if (filters.price.since) {
      params = params.set('price',`min:${filters.price.since}`);
    }else if (filters.price.until) {
      params = params.set('price', `max:${filters.price.until}`);
    }

    return this._httpClient.get<ProductResponse>(`${this.baseUrl}products?page=${page}`, {params});
  } 

  getAllBrands() : Observable<IGetAllBrandsResponse> {
    return this._httpClient.get<IGetAllBrandsResponse>(`${this.baseUrl}products/brands`);
  }
}

