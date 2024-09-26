import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { BuildYourPcCartEntry } from 'app/core/models/BuildYourPcCartEntry';
import { BuildYourPcService } from 'app/core/services/build_your_pc/build-your-pc.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { CustomCurrencyPipe } from "../../../../../core/pipes/custom_currency/custom-currency.pipe";
import { CartService } from 'app/core/services/cart_service/cart-service.service';
import { IProduct_Cart } from 'app/core/models/product_cart';
import { Router } from '@angular/router';
import { IProduct_Cart_Add_Entry_Request } from 'app/core/models/IProduct_Cart_Add_Entry_Request';

@Component({
  selector: 'app-build-your-pc-summary',
  standalone: true,
  imports: [AsyncPipe, CustomCurrencyPipe],
  templateUrl: './build-your-pc-summary.component.html',
  styleUrl: './build-your-pc-summary.component.scss'
})
export class BuildYourPcSummaryComponent {


  _buildYourPcService = inject(BuildYourPcService);
  _cartService = inject(CartService);
  _router = inject(Router);
  products: BuildYourPcCartEntry[] = [];
  cartTotal$ !: number;
  ngOnInit(): void {
    this._buildYourPcService.buildYourPcCart$.subscribe(products => {
      this.products = products;
    });

    this._buildYourPcService.cartTotal$.subscribe(total => {
      this.cartTotal$ = total;
    });

    window.scrollTo(0, 0);
  }

  goToCart() {

    // Add to cart List Product Cart


    let productsArray: IProduct_Cart_Add_Entry_Request[] = [];
    for (let product of this.products) {

      if (product.selectedProductID != null
        && product.selectedProductName != null
        && product.categoryName.toLocaleLowerCase() != 'linea') {
        let p: IProduct_Cart_Add_Entry_Request = {
          productId: product.selectedProductID,
          quantity: product.selectedProductQuantity
        }

        productsArray.push(p);
      }
    }
    this._cartService.addAllToCart(productsArray).subscribe(() => {

      this._buildYourPcService.clearCart();
      this._router.navigate(['/cart']);

    });


  }
}
