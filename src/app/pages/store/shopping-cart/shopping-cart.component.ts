import { Component, OnInit, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../../core/services/cart_service/cart-service.service';
import { IProduct_Cart } from '../../../core/models/product_cart';
import { MatIcon } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { CustomCurrencyPipe } from "../../../core/pipes/custom_currency/custom-currency.pipe";
import { AuthService } from 'app/core/services/auth_service/auth.service';
import { ConfirmPopUpComponent } from "../../../shared/components/pop_up/confirm-pop-up/confirm-pop-up.component";
import { MessagePopUpComponent } from "../../../shared/components/pop_up/message-pop-up/message-pop-up.component";
import { IProduct_Cart_Entry_BK } from 'app/core/models/IProduct_Cart_Entry_BK';
@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [CurrencyPipe, MatIcon, RouterLink, CustomCurrencyPipe, ConfirmPopUpComponent, MessagePopUpComponent],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss'
})
export class ShoppingCartComponent implements OnInit {

  shipping!: boolean;
  shippingValue !: number;
  totalPrice !: number;
  _router: Router = inject(Router);
  products !: IProduct_Cart_Entry_BK[];
  _cartService: CartService = inject(CartService);
  _authService = inject(AuthService);


  showMustLoginPopUp: boolean = false;


  constructor() {
    this.shipping = true; //TODO: handle the this envio
    this.shippingValue = 0; //TODO: handle the this envio
    this._cartService.getCartTotal().subscribe(total => {
      this.totalPrice = total;
    })
  }

  ngOnInit(): void {
    if(!this._authService.isAnyUserOrAdminLoggedIn()){
      this._router.navigate(['auth/cart/must-login']);
    }

    this._cartService.getAllProducts().subscribe(products => {
      this.products = products;
    })
  }

  deleteProduct(entryID : string): void {
    this._cartService.deleteProduct(entryID).subscribe({
      next: (success) => {
        this.updateProductsState();
      }
    });
  }
  updateProductsState() {
    this._cartService.getAllProducts().subscribe(products => {
      this.products = products;
    })
  }

  removeQuantity(entry: IProduct_Cart_Entry_BK) {
    if (entry.quantity > 1) {
      this._cartService.updateProductQuantitySimple(entry, "decrease").subscribe((response) => {});
    };
  }

  addQuantity(entry: IProduct_Cart_Entry_BK) {
    console.log(entry);
    if(entry.quantity<entry.stock){
      this._cartService.updateProductQuantitySimple(entry, "increase").subscribe((response) => {});
    }
  }

  updateProductQuantity(product: IProduct_Cart, quantity: number): void {
    // this._cartService.updateProductQuantity(product, quantity);
  }

  sendToChoiceDeliveryMethod() {
    console.log("En sendToChoiceDeliveryMethod");
    console.log(this._authService.isUserLoggedIn());
    console.log(this._authService.isAdminLoggedIn());
    if (this._authService.isUserLoggedIn() || this._authService.isAdminLoggedIn()) {
      console.log("hola");
      this._router.navigate(['buying/delivery-method']);
    }
    else {
      this.showMustLoginPopUp = true;
    }
  }

  closePopUp(option: string) {
    switch (option) {
      case 'showMustLoginPopUp': this.showMustLoginPopUp = false;
    }

  }

  sendToLogin() {
    this.closePopUp('showMustLoginPopUp');
    this._router.navigate(['auth']);
  }
}