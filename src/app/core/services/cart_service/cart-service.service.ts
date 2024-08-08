import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { IProduct_Cart } from '../../models/product_cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart: IProduct_Cart[] = [];
  $cart: BehaviorSubject<IProduct_Cart[]> = new BehaviorSubject<IProduct_Cart[]>(this.cart);
  private $cartQuantity: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private $cartTotal: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor() {
    const cartData = localStorage.getItem('cart');
    if (cartData) {
      this.cart = JSON.parse(cartData);
      this.$cart.next(this.cart);
      this.$cartQuantity.next(this.cart.length);
      this.$cartTotal.next(this.calculateTotal());
    }
  }

  public addToCart(product: IProduct_Cart): void {
    const index = this.findIndexIfProductIsAlreadyInCart(product.id);
    if (index === -1) {
      //if product not in cart, add it
      product.quantityRequested = 1;
      this.cart.push(product);
      this.$cartQuantity.next(this.cart.length);
      this.$cartTotal.next(this.calculateTotal());
      this.saveCartInLocalStorage();
    }
    else {
      //if product already in cart, add quantity
      this.cart[index].quantityRequested = this.cart[index].quantityRequested + 1;
      this.saveCartInLocalStorage();
    }
  }

  private saveCartInLocalStorage(): void {
    localStorage.setItem('cart', JSON.stringify(this.cart));

    if (localStorage.getItem('cart') !== null) {
      JSON.parse(localStorage.getItem('cart') as string);
    }
    else{
      console.log("Cart is empty");
    }

  }



  findIndexIfProductIsAlreadyInCart(idReceived: string): number {
    return this.cart.findIndex(item => item.id === idReceived);
  }

  public getAllProducts(): Observable<IProduct_Cart[]> {
    return this.$cart.asObservable();
  }

  public clearCart(): void {
    this.cart = [];
    this.$cartQuantity.next(0);
    this.$cartTotal.next(0);
    this.saveCartInLocalStorage();
  }

  public getCartTotal(): Observable<number> {
    return this.$cartTotal.asObservable(); // 0 is the value with it start.
  }

  public getCartQuantity(): Observable<number> {
    return this.$cartQuantity.asObservable();
  }

  public deleteProduct(id: string): void {
    const index = this.findIndexIfProductIsAlreadyInCart(id);
    if (index !== -1) {
      this.cart.splice(index, 1);
      this.$cartQuantity.next(this.cart.length);
      this.$cartTotal.next(this.calculateTotal());
      this.saveCartInLocalStorage();
    }
  }

  public getProductById(id: string): IProduct_Cart | undefined {
    // Verificar si el producto existe? 
    return this.cart.find(product => product.id === id);
  }

  //TODO: Verificar si este metodo funciona
  public updateProductQuantity(product: IProduct_Cart, quantity: number): void {
    const index = this.cart.indexOf(product);
    if (index !== -1) {
      this.cart[index].quantityRequested = quantity;
      this.saveCartInLocalStorage();
    }
  }


  public updateProductQuantitySimple(product: IProduct_Cart, action: string): void {
    const index = this.cart.indexOf(product);
    if (index !== -1) {
      let product = this.cart[index];
      if (action === "increase" && product.quantityRequested < product.stock) {
        this.cart[index].quantityRequested = this.cart[index].quantityRequested + 1;
        this.$cartTotal.next(this.calculateTotal());
        this.saveCartInLocalStorage();
      }
      else if (action === "decrease" && product.quantityRequested > 0) {
        this.cart[index].quantityRequested += -1;
        this.$cartTotal.next(this.calculateTotal());
        this.saveCartInLocalStorage();
      }
    }
  }

  private calculateTotal(): number {
    return this.cart.reduce((suma, item) => suma + item.price * item.quantityRequested, 0);
  }

}
