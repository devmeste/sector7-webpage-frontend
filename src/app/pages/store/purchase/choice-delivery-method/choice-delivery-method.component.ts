import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { IProduct_Cart } from 'app/core/models/product_cart';
import { CartService } from 'app/core/services/cart_service/cart-service.service';
import { PurchaseService } from 'app/core/services/purchase_service/purchase.service';
import { ChargeJsScriptsService } from 'app/charge-js-scripts.service';

import { MercadoPagoJS } from 'assets/js/mp';
import { CustomForm } from 'app/core/utils/custom-form/custom.form';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-choice-delivery-method',
  standalone: true,
  imports: [CurrencyPipe, ReactiveFormsModule],
  templateUrl: './choice-delivery-method.component.html',
  styleUrl: './choice-delivery-method.component.scss'
})
export class ChoiceDeliveryMethodComponent extends CustomForm {
  override initializeForm(): void {
    this.form = this.formBuilder.group({
      deliveryMethod: ['in_local']
    })
  }
 

  shipping: any;

  _PurchaseService = inject(PurchaseService);
  _cartService = inject(CartService);
  _chargeJsScriptsService = inject(ChargeJsScriptsService);
  mercadoPago !: MercadoPagoJS;
  products$ !: IProduct_Cart[];
  cartQuantity$ !: number;
  total$ !: number;

  ngOnInit(): void {
    this._cartService.getAllProducts().subscribe(products => {
      this.products$ = products
    })
    this._cartService.getCartQuantity().subscribe(quantity => {
      this.cartQuantity$ = quantity;
    })
    this._cartService.getCartTotal().subscribe(total => {
      this.total$ = total;
    })

    this._chargeJsScriptsService.charge(['mp']);

  }


  override send($event: SubmitEvent): void {
    $event.preventDefault();

    console.log(this.form.value);
    // this._PurchaseService.makePurchase().subscribe({
    //   next: mpCode => {
    //       this.createMpButton(mpCode);
    //   },
    //   error: error => {  
    //     console.error('Error making purchase', error);
    //   }
    // }
    // );
  }


  createMpButton(mpCode: string) {
    this.mercadoPago = new MercadoPagoJS();
    this.mercadoPago.createButton(mpCode);
  }

}


