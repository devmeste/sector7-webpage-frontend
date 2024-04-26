import { Injectable } from '@angular/core';
import { IProduct } from '../../models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart: IProduct[] = [];

  constructor() { }

  public addToCart(product: IProduct): void {
    this.cart.push(product);
  }

  public getAllProducts(): IProduct[] {
    return this.cart;
  }

  public clearCart(): void {
    this.cart = [];
  }

  public getCartTotal(): number {
    return this.cart.reduce((suma, item) => suma + item.price, 0); // 0 is the value with it start.
  }

  public getCartQuantity(): number {
    return this.cart.length;
  }

  public deleteProduct(product: IProduct): void {
    this.cart = this.cart.filter((item) => item.id !== product.id);
  }
 
  public getProductById(id: string): IProduct | undefined {
    return this.cart.find(product => product.id === id);
  }

  //TODO: Verificar si este metodo funciona
  public updateProductQuantity(product: IProduct, quantity: number): void {
    const index = this.cart.indexOf(product);
    if (index !== -1) {
      this.cart[index].stock = quantity;
    }
  }



}
