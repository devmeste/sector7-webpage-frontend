import { Component, OnInit, inject } from '@angular/core';
import { CartService } from '../../../core/services/cart_service/cart-service.service';
import { IProduct } from '../../../core/models/product';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss'
})
export class ShoppingCartComponent implements OnInit {

  products !: IProduct[];
  _cartService: CartService = inject(CartService);

  ngOnInit(): void {
    this.products = this._cartService.getAllProducts();
  }

  deleteProduct(product: IProduct): void {
    this._cartService.deleteProduct(product);
    this.products = this._cartService.getAllProducts();
  }

  // updateProductQuantity(product: IProduct_Cart, quantity: number): void {
  //   this._cartService.updateProductQuantity(product, quantity);
  //   this.products = this._cartService.getAllProducts();
  // }

}
