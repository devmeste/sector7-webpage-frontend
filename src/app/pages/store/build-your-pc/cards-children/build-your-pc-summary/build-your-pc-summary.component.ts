import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { BuildYourPcCartEntry } from 'app/core/models/BuildYourPcCartEntry';
import { BuildYourPcService } from 'app/core/services/build_your_pc/build-your-pc.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { CustomCurrencyPipe } from "../../../../../core/pipes/custom_currency/custom-currency.pipe";
import { CartService } from 'app/core/services/cart_service/cart-service.service';
import { IProduct_Cart } from 'app/core/models/product_cart';
import { Router } from '@angular/router';

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


    for(let product of this.products){
      if(product.selectedProductID != null 
        && product.selectedProductName != null 
        && product.categoryName.toLocaleLowerCase() != 'linea'
      ){
        const p : IProduct_Cart = {
          id: product.selectedProductID,
          name: product.selectedProductName,
          img: product.selectedProductPhoto,
          price: product.selectedProductPrice,
          stock: product.selectedProductQuantity,
          quantityRequested: product.selectedProductQuantity
        }
        this._cartService.addToCart(p);
      }
    }

    this._buildYourPcService.clearCart();
    this._router.navigate(['/cart']);
  }
}
