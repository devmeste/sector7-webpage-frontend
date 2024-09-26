import { AsyncPipe,  } from '@angular/common';
import { Component, inject,  } from '@angular/core';
import { BuildYourPcCartEntry } from 'app/core/models/BuildYourPcCartEntry';
import { BuildYourPcService } from 'app/core/services/build_your_pc/build-your-pc.service';
import { CustomCurrencyPipe } from "../../../../../core/pipes/custom_currency/custom-currency.pipe";
import { CartService } from 'app/core/services/cart_service/cart-service.service';
import { Router } from '@angular/router';
import { IProduct_Cart_Add_Entry_Request } from 'app/core/models/IProduct_Cart_Add_Entry_Request';
import { ISaveAll } from 'app/core/models/cart/ISaveAll';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-build-your-pc-summary',
  standalone: true,
  imports: [AsyncPipe, CustomCurrencyPipe, FormsModule],
  templateUrl: './build-your-pc-summary.component.html',
  styleUrl: './build-your-pc-summary.component.scss'
})
export class BuildYourPcSummaryComponent {


  _buildYourPcService = inject(BuildYourPcService);
  _cartService = inject(CartService);
  _router = inject(Router);
  products: BuildYourPcCartEntry[] = [];
  cartTotal$ !: number;

  assembled: boolean = false;
  installed: boolean = false;
  installedPrice : number = 1200;
  assembledPrice : number = 300;

  ngOnInit(): void {
    this._buildYourPcService.buildYourPcCart$.subscribe(products => {
      this.products = products;
    });

    this._buildYourPcService.cartTotal$.subscribe(total => {
      this.cartTotal$ = total;
      this.sumaTotal = this.cartTotal$;
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

    const cart : ISaveAll = {
      cartLines: productsArray,
      assembled: this.assembled,
      installed: this.installed
    }
    


    this._cartService.addAllToCart(cart).subscribe(() => {

      this._buildYourPcService.clearCart();
      this._router.navigate(['/cart']);

    });


  }

  suma = 0;
  sumaTotal= 0;
  sum(){
    if(this.assembled ){
      this.sumaTotal = this.sumaTotal + 300;
    }
    if(this.installed){
      this.sumaTotal = this.sumaTotal + 300;
    }
  }
}
