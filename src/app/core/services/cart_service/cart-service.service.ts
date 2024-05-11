import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable , of} from 'rxjs';
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
    const p : IProduct_Cart = {
      id: '0',
      name: 'Procesador AMD RYZEN 3 3200G 4.0GHz Turbo + Radeon Vega 8 AM4 Wraith Stealth Cooler',
      img: '../../../../assets/images/products/product-detail-1.png',
      price: 2000,
      stock: 10,
      quantityRequested: 1
    }
    const p2 : IProduct_Cart = {
      id: '1',
      name: 'Procesador AMD RYZEN 3 3200G 4.0GHz Turbo + Radeon Vega 8 AM4 Wraith Stealth Cooler',
      img: '../../../../assets/images/products/silla.png',
      price: 2000,
      stock: 10,
      quantityRequested: 1
    }
    const p3 : IProduct_Cart = {
      id: '2',
      name: 'Procesador AMD RYZEN 3 3200G 4.0GHz Turbo + Radeon Vega 8 AM4 Wraith Stealth Cooler',
      img: '../../../../assets/images/products/auriculares.png',
      price: 2000,
      stock: 10,
      quantityRequested: 1
    }
    const p4 : IProduct_Cart = {
      id: '3',
      name: 'Procesador AMD RYZEN 3 3200G 4.0GHz Turbo + Radeon Vega 8 AM4 Wraith Stealth Cooler',
      img: '../../../../assets/images/products/product-detail-1.png',
      price: 2000,
      stock: 10,
      quantityRequested: 1
    }

    this.cart.push(p);
    this.cart.push(p2);
    this.cart.push(p3);
    this.cart.push(p4);
    this.$cartQuantity.next(this.cart.length);
    this.$cartTotal.next(this.calculateTotal());
  } 

  public addToCart(product: IProduct_Cart): void {
    // const index = this.cart.indexOf(product);
    const index = this.cart.findIndex(item => item.id === product.id);

    if (index !== -1) {
      this.cart[index].quantityRequested = this.cart[index].quantityRequested + 1;
    }
    else {
      product.quantityRequested = 1;
      this.cart.push(product);
      this.$cartQuantity.next(this.cart.length);
      this.$cartTotal.next(this.calculateTotal());
    }
    console.log(this.cart);
  }

  public getAllProducts(): Observable<IProduct_Cart[]> {
    return this.$cart.asObservable();
  }

  public clearCart(): void {
    this.cart = [];
    this.$cartQuantity.next(0);
    this.$cartTotal.next(0);
  }

  public getCartTotal(): Observable<number> {
    return this.$cartTotal.asObservable(); // 0 is the value with it start.
  }

  public getCartQuantity(): Observable<number> {
    return this.$cartQuantity.asObservable();
  }

  public deleteProduct(id: string): void {
    const index = this.cart.findIndex(product => product.id === id);
    if (index !== -1) {
      this.cart.splice(index, 1);
      this.$cartQuantity.next(this.cart.length);
      this.$cartTotal.next(this.calculateTotal());
    }
  }

  public getProductById(id: string): IProduct_Cart | undefined {
    return this.cart.find(product => product.id === id);
  }

  //TODO: Verificar si este metodo funciona
  public updateProductQuantity(product: IProduct_Cart, quantity: number): void {
    const index = this.cart.indexOf(product);
    if (index !== -1) {
      this.cart[index].quantityRequested = quantity;
    }
  }

  
  public updateProductQuantitySimple(product: IProduct_Cart, action: string): void {
    const index = this.cart.indexOf(product);
    if (index !== -1) {
      if(action==="increase"){
        this.cart[index].quantityRequested = this.cart[index].quantityRequested +1;
        this.$cartTotal.next(this.calculateTotal());
      }
      else{
        this.cart[index].quantityRequested+= -1;
        this.$cartTotal.next(this.calculateTotal());
      }
    }
  }

  private calculateTotal(): number {
    return this.cart.reduce((suma, item) => suma + item.price * item.quantityRequested, 0);
  }

}
