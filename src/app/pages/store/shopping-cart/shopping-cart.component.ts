import { Component, OnInit, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../../core/services/cart_service/cart-service.service';
import { IProduct_Cart } from '../../../core/models/product_cart';
import { MatIcon } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { CustomCurrencyPipe } from "../../../core/pipes/custom_currency/custom-currency.pipe";

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [CurrencyPipe, MatIcon, RouterLink, CustomCurrencyPipe],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss'
})
export class ShoppingCartComponent implements OnInit {
  shipping!: boolean ;
  shippingValue !: number;
  totalPrice !: number;
  _router: Router = inject(Router);
  products !: IProduct_Cart[];
  _cartService: CartService = inject(CartService);

  constructor() {
      this.shipping = true; //TODO: handle the this envio
      this.shippingValue = 0; //TODO: handle the this envio
      this._cartService.getCartTotal().subscribe(total => {
        this.totalPrice = total;
      })
   }

  ngOnInit(): void {
    this._cartService.getAllProducts().subscribe(products => {
      this.products = products;      
    })
  }

  deleteProduct(id: string): void {
    this._cartService.deleteProduct(id);

  }

  removeQuantity(p: IProduct_Cart) {
    if(p.quantityRequested>0) {
      this._cartService.updateProductQuantitySimple(p, "decrease");
    };
  }
  addQuantity(p: IProduct_Cart) {
    this._cartService.updateProductQuantitySimple(p, "increase");
  }
  updateProductQuantity(product: IProduct_Cart, quantity: number): void {
    this._cartService.updateProductQuantity(product, quantity);
  }

  sendToChoiceDeliveryMethod() {
    this._router.navigate(['buying/delivery-method']);
  }
}
