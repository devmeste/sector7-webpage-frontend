import { Injectable } from '@angular/core';
import { IProduct } from '../../models/product';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products : IProduct [] = [
    {id:"1", name: 'Procesador AMD RYZEN 3 3200G 4.0GHz Turbo + Radeon Vega 8 AM4 Wraith Stealth Cooler', description: 'Product 1 description', 
    imgs: ['../../../../assets/images/products/product-detail-1.png', '../../../../assets/images/products/product-detail-2.png', 
    '../../../../assets/images/products/product-detail-3.png',  '../../../../assets/images/products/product-detail-4.png', 
    '../../../../assets/images/products/product-detail-5.png',
    ], price: 1000, stock: 10},
    
    {id:"2", name: 'Procesador AMD RYZEN 3 3200G 4.0GHz Turbo + Radeon Vega 8 AM4 Wraith Stealth Cooler', description: 'Product 2 description', 
    imgs: ['../../../../assets/images/products/product.png'], price: 1000 , stock: 10},
    
    {id:"3", name: 'Procesador AMD RYZEN 3 3200G 4.0GHz Turbo + Radeon Vega 8 AM4 Wraith Stealth Cooler', description: 'Product 3 description', 
    imgs: ['../../../../assets/images/products/product.png'], price: 1000, stock: 10},
    
    {id:"4", name: 'Procesador AMD RYZEN 3 3200G 4.0GHz Turbo + Radeon Vega 8 AM4 Wraith Stealth Cooler', description: 'Product 4 description', 
    imgs: ['../../../../assets/images/products/product.png'], price: 1000, stock: 10},
    
    {id:"5", name: 'Procesador AMD RYZEN 3 3200G 4.0GHz Turbo + Radeon Vega 8 AM4 Wraith Stealth Cooler', description: 'Product 5 description', 
    imgs: ['../../../../assets/images/products/product.png'], price: 1000, stock: 10},

    {id:"6", name: 'Procesador AMD RYZEN 3 3200G 4.0GHz Turbo + Radeon Vega 8 AM4 Wraith Stealth Cooler', description: 'Product 6 description', 
    imgs: ['../../../../assets/images/products/product.png'], price: 1000, stock: 10},

    {id:"7", name: 'Procesador AMD RYZEN 3 3200G 4.0GHz Turbo + Radeon Vega 8 AM4 Wraith Stealth Cooler', description: 'Product 7 description', 
    imgs: ['../../../../assets/images/products/product.png'], price: 1000, stock: 10},

    {id:"8", name: 'Procesador AMD RYZEN 3 3200G 4.0GHz Turbo + Radeon Vega 8 AM4 Wraith Stealth Cooler', description: 'Product 8 description', 
    imgs: ['../../../../assets/images/products/product.png'], price: 1000, stock: 10},

    {id:"9", name: 'Procesador AMD RYZEN 3 3200G 4.0GHz Turbo + Radeon Vega 8 AM4 Wraith Stealth Cooler', description: 'Product 9 description', 
    imgs: ['../../../../assets/images/products/product.png'], price: 1000, stock: 10},
    {id:"10", name: 'Procesador AMD RYZEN 3 3200G 4.0GHz Turbo + Radeon Vega 8 AM4 Wraith Stealth Cooler', description: 'Product 9 description', 
    imgs: ['../../../../assets/images/products/product.png'], price: 1000, stock: 10},
    
  ];

  private products$: BehaviorSubject<IProduct []> = new BehaviorSubject<IProduct []>(this.products);


  constructor() { }

  public getProducts(): Observable<IProduct []> {
    return this.products$.asObservable();
  }

  public addProduct (p : IProduct) {
    this.products.push(p);
    this.products$.next(this.products);
  }

  public getProductById(id: string): IProduct | undefined {
    return this.products.find(product => product.id === id);
  }

}
