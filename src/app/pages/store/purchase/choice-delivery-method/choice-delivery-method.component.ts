import { CurrencyPipe, NgClass, NgStyle } from '@angular/common';
import { Component, ElementRef, inject, ViewChild, viewChild } from '@angular/core';
import { IProduct_Cart } from 'app/core/models/product_cart';
import { CartService } from 'app/core/services/cart_service/cart-service.service';
import { PurchaseService } from 'app/core/services/purchase_service/purchase.service';

import { MercadoPagoJS } from 'assets/js/MercadoPagoJS.js';
import { CustomForm } from 'app/core/utils/custom-form/custom.form';
import { ReactiveFormsModule } from '@angular/forms';
import { Address } from 'app/core/models/IMakePurchase';
import { FillAddressPopUpComponent } from "../fill-address-pop-up/fill-address-pop-up.component";
import { FooterComponent } from "../../../../shared/components/footer/footer.component";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-choice-delivery-method',
  standalone: true,
  imports: [CurrencyPipe, ReactiveFormsModule, 
    FillAddressPopUpComponent, FooterComponent,NgClass,MatProgressSpinnerModule, NgStyle],
  templateUrl: './choice-delivery-method.component.html',
  styleUrl: './choice-delivery-method.component.scss'
})
export class ChoiceDeliveryMethodComponent extends CustomForm {

  @ViewChild('primaryButton') primaryButton !: ElementRef<HTMLButtonElement>;
  shipping: any;

  _PurchaseService = inject(PurchaseService);
  _cartService = inject(CartService);
  mercadoPago !: MercadoPagoJS;
  products$ !: IProduct_Cart[];
  cartQuantity$ !: number;
  total$ !: number;
  addressFillOutByUser: Address | null = null;

  showFillAddressPopUp: boolean = false;
  isLoadingRequest: boolean = false;
  hidePrimaryButton : boolean = false;
  isDisabledButton : boolean = false;
  showMPButton: boolean = false;

  override initializeForm(): void {
    this.form = this.formBuilder.group({
      deliveryMethod: ['in_local']
    })
  }

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
    this.initializeForm();
  }


  override send($event: SubmitEvent): void {
    $event.preventDefault();
    let choice = this.form.get('deliveryMethod')?.value;
    this.isDisabledButton = true;
    if ( choice === 'in_local') {
      this.makePurchase(null);
    } 
    else if (choice === 'home_delivery' && this.addressFillOutByUser) {
      this.makePurchase(this.addressFillOutByUser);
    }
    else if (choice === 'home_delivery' && !this.addressFillOutByUser) {
      this.showFillAddressPopUp=true;
    }

  }



  makePurchase(address: Address | null) {    
    this._PurchaseService.makePurchase(address).subscribe({
      next: mpCode => {
        this.createMpButton(mpCode);
      },
      error: error => {
        console.error('Error making purchase', error);
      }
    }
    );
  }

  createMpButton(mpCode: string) {
    this.mercadoPago = new MercadoPagoJS();
    this.hidePrimaryButtonFn();
    this.mercadoPago.createButton(mpCode).then((message) => {
      this.isLoadingRequest = false;
      this.showMPButton=true;
      this.form.disable();
    }).catch((error) => {
      this.showPrimaryButtonFn();
    });
  }

  onDeliveryMethodChange(choiceShippingRadioButton: string) {
    choiceShippingRadioButton === 'home_delivery' ? 
      this.showFillAddressPopUp = true 
      : 
      this.showFillAddressPopUp = false;
  }

  openAddressForm(): void {
    this.showFillAddressPopUp = true;
  }

  receiveAddressFromForm( address: Address | null): void {
    this.addressFillOutByUser = address;
    this.closeModal('showFillAddressPopUp');;
  }

  closeModal(option : string) {
    if(option === 'showFillAddressPopUp') {
      this.showFillAddressPopUp = false;
    }
  }

  hidePrimaryButtonFn() {
    if (this.primaryButton) {
      this.primaryButton.nativeElement.style.display = 'none';
    }
    this.isLoadingRequest = true;
  }
  showPrimaryButtonFn() {
    if (this.primaryButton) {
      this.primaryButton.nativeElement.style.display = 'flex';
    }
    this.isLoadingRequest = false;
  }
}


