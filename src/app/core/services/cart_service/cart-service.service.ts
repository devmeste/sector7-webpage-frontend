import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, tap } from 'rxjs';
import { IProduct_Cart } from '../../models/product_cart';
import { HttpClient } from '@angular/common/http';
import { environment } from 'app/core/environments/environment';
import { IProduct_Cart_Entry_BK } from 'app/core/models/IProduct_Cart_Entry_BK';
import { AuthService } from '../auth_service/auth.service';
import { IProduct_Cart_Add_Entry_Request } from 'app/core/models/IProduct_Cart_Add_Entry_Request';
import { CartQuantityAction } from '../../models/types/CartQuantityAction';
import { ISaveAll } from 'app/core/models/cart/ISaveAll';
import { IProductCart } from 'app/core/models/IProductCart';

@Injectable({
  providedIn: 'root'
})
export class CartService {


  private baseUrl: string = environment.apiUrl;
  _authService = inject(AuthService);

  _httpClient: HttpClient = inject(HttpClient);


  cart: IProduct_Cart_Entry_BK[] = [];

  private $cart: BehaviorSubject<IProduct_Cart_Entry_BK[]> = new BehaviorSubject<IProduct_Cart_Entry_BK[]>(this.cart);
  private $cartQuantity: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private $cartTotal: BehaviorSubject<number> = new BehaviorSubject<number>(0);


  constructor() {

    this._authService.isAnyUserOrAdminLoggedIn$().subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        this.getAllProducts();
      }
      else {
        this.cartLogout();

      }
    })
  }


  public addToCart(product: IProduct_Cart): Observable<IProduct_Cart_Entry_BK> {

    const entry: IProduct_Cart_Add_Entry_Request = {
      productId: product.id,
      quantity: product.quantityRequested
    }

    return this._httpClient.post<IProduct_Cart_Entry_BK>(`${this.baseUrl}cart`, entry).pipe(
      tap((newEntry: IProduct_Cart_Entry_BK) => {
        this.cart.push(newEntry);
        this.$cart.next(this.cart);
        this.$cartQuantity.next(this.cart.length);
        this.$cartTotal.next(this.calculateTotal());
      })
    );
  }


  public addAllToCart(cart: ISaveAll) {
    return this._httpClient.post(`${this.baseUrl}cart/build-pc`, cart).pipe(
      tap((Response) => {
          console.log(Response);
      }
    ));
  }

  logoutCart(): void {
    this.cart = [];
    this.$cart.next(this.cart);
    this.$cartQuantity.next(0);
    this.$cartTotal.next(0);
  }

  private saveCartInLocalStorage(): void {
    localStorage.setItem('cart', JSON.stringify(this.cart));

    if (localStorage.getItem('cart') !== null) {
      JSON.parse(localStorage.getItem('cart') as string);
    }
    else {
      console.log("Cart is empty");
    }

  }



  findIndexIfProductIsAlreadyInCart(idReceived: string): number {
    return this.cart.findIndex(item => item.id === idReceived);
  }

  // just use it if Admin or User is logged in
  // public getAllProducts(): Observable<IProduct_Cart_Entry_BK[]> {

  //   this._httpClient.get<IProductCart>(`${this.baseUrl}cart`).subscribe(cart => {
  //     this.cart = cart.cartLines;
  //     this.$cart.next(this.cart);
  //     this.$cartQuantity.next(this.cart.length);
  //     const totalCart = this.calculateTotal();
  //     this.$cartTotal.next(totalCart);
      
  //   })
    
  //   return this.$cart.asObservable();

  // }


  public getAllProducts(): Observable<IProduct_Cart_Entry_BK[]> {
    return this._httpClient.get<IProductCart>(`${this.baseUrl}cart`).pipe(
      tap(cart => {
        this.cart = cart.cartLines;
        this.$cart.next(this.cart);
        this.$cartQuantity.next(this.cart.length);
        const totalCart = this.calculateTotal();
        this.$cartTotal.next(totalCart);
      }),
      map(cart => cart.cartLines) // Retornamos solo las líneas del carrito como observable
    );
  }


  public cartLogout(): void {
    this.cart = [];
    this.$cart.next(this.cart);
    this.$cartQuantity.next(0);
    this.$cartTotal.next(0);
  }

  public clearCart(): void {
    this._httpClient.delete<void>(`${this.baseUrl}cart`).subscribe(() => {
      this.cart = [];
      this.$cart.next(this.cart);
      this.$cartQuantity.next(0);
      this.$cartTotal.next(0);
    })
  }

  public getCartTotal(): Observable<number> {
    return this.$cartTotal.asObservable(); // 0 is the value with it start.
  }

  public getCartQuantity(): Observable<number> {
    return this.$cartQuantity.asObservable();
  }

  public deleteProduct(id: string): Observable<any> {
    return this._httpClient.delete(this.baseUrl + 'cart/' + id);
  }

  public getProductById(id: string): IProduct_Cart_Entry_BK | undefined {
    // Verificar si el producto existe? 
    return this.cart.find(product => product.id === id);
  }

  public updateProductQuantity(product: IProduct_Cart_Entry_BK, quantity: number): void {
    // const index = this.cart.indexOf(product);
    // if (index !== -1) {
    //   this.cart[index].quantityRequested = quantity;
    //   this.saveCartInLocalStorage();
    // }
  }




  public updateProductQuantitySimple(entry: IProduct_Cart_Entry_BK, action: CartQuantityAction): Observable<any> {

    if (action === 'increase') {
      if (entry.quantity < entry.stock) {
        const quantity = entry.quantity + 1;
        return this._httpClient.patch(this.baseUrl + 'cart/' + entry.id + '/' + quantity, {}).pipe(
          tap(() => {
            this.getAllProducts().subscribe();
          })
        );
      }
    }
    else if (action === 'decrease') {
      if (entry.quantity > 1) {
        const quantity = entry.quantity - 1;
        return this._httpClient.patch(this.baseUrl + 'cart/' + entry.id + '/' + quantity, {}).pipe(
          tap(() => {
            this.getAllProducts().subscribe();
          })
        );
      }
    }

    throw new Error('Invalid quantity');
  }

  private calculateTotal(): number {
    return this.cart.reduce((suma, item) => suma + item.price * item.quantity, 0);
    // return 0;
  }

}

