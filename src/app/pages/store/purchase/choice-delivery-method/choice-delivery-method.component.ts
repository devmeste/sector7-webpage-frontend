import { CurrencyPipe, NgClass, NgStyle } from '@angular/common';
import { Component, ElementRef, inject, ViewChild, viewChild } from '@angular/core';
import { IProduct_Cart } from 'app/core/models/product_cart';
import { CartService } from 'app/core/services/cart_service/cart-service.service';
import { PurchaseService } from 'app/core/services/purchase_service/purchase.service';

// import { MercadoPagoJS } from 'assets/js/MercadoPagoJS.js';
import { CustomForm } from 'app/core/utils/custom-form/custom.form';
import { ReactiveFormsModule } from '@angular/forms';
import { Address } from 'app/core/models/IMakePurchase';
import { FillAddressPopUpComponent } from "../fill-address-pop-up/fill-address-pop-up.component";
import { FooterComponent } from "../../../../shared/components/footer/footer.component";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MessagePopUpComponent } from "../../../../shared/components/pop_up/message-pop-up/message-pop-up.component";
import { CustomCurrencyPipe } from "../../../../core/pipes/custom_currency/custom-currency.pipe";
import { IProduct_Cart_Entry_BK } from 'app/core/models/IProduct_Cart_Entry_BK';
import { Router } from '@angular/router';

@Component({
  selector: 'app-choice-delivery-method',
  standalone: true,
  imports: [CurrencyPipe, ReactiveFormsModule,
    FillAddressPopUpComponent, FooterComponent, NgClass, MatProgressSpinnerModule, NgStyle, MessagePopUpComponent, CustomCurrencyPipe],
  templateUrl: './choice-delivery-method.component.html',
  styleUrl: './choice-delivery-method.component.scss'
})
export class ChoiceDeliveryMethodComponent extends CustomForm {


  @ViewChild('primaryButton') primaryButton !: ElementRef<HTMLButtonElement>;
  shipping: any;

  _PurchaseService = inject(PurchaseService);
  _cartService = inject(CartService);
  _router = inject(Router);

  // mercadoPago !: MercadoPagoJS;
  products$ !: IProduct_Cart_Entry_BK[];
  cartQuantity$ !: number;
  total$ !: number;
  addressFillOutByUser: Address | null = null;

  showFillAddressPopUp: boolean = false;
  isLoadingRequest: boolean = false;
  hidePrimaryButton: boolean = false;
  isDisabledButton: boolean = false;
  showMPButton: boolean = false;
  showErrorPopUp: boolean = false;
  errorMessage: string = '';

  override initializeForm(): void {
    this.form = this.formBuilder.group({
      deliveryMethod: ['in_local']
    })
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this._cartService.getAllProducts().subscribe(products => {
      this.products$ = products
    })
    this._cartService.getCartQuantity().subscribe(quantity => {
      this.cartQuantity$ = quantity;
    })
    this._cartService.getCartTotal().subscribe(total => {
      this.total$ = total;
    })
  }


  override send($event: SubmitEvent): void {
    $event.preventDefault();
    
    let choice = this.form.get('deliveryMethod')?.value;
    this.isDisabledButton = true;
    if (choice === 'in_local') {
      // this.makePurchase(null);
      this._router.navigate(['buying/local/payment-method']);
    }
    else if (choice === 'home_delivery' && this.addressFillOutByUser) {
      // this.makePurchase(this.addressFillOutByUser);
      localStorage.setItem('shippingInfo', JSON.stringify(this.addressFillOutByUser));
      this._router.navigate(['buying/shipping/payment-method']);
    }
    else if (choice === 'home_delivery' && !this.addressFillOutByUser) {
      this.showFillAddressPopUp = true;
      this.isDisabledButton = false;
    }

  }



  // makePurchase(address: Address | null) {
  //   // Aca yo deberia recibir un atributo 

  //   // paymentMethod es el atributo que recbe el meste
  //   this._PurchaseService.makePurchase(address).subscribe({
  //     next: mpCode => {
  //       if(mpCode != null){
  //         this.createMpButton(mpCode);
  //       }
  //       else{
  //         // Mostrar pop up de exito de compra, y avisarle que le mandamos el 
  //         // comprobante al email.
  //       }
  //     },
  //     error: error => {
  //       console.error('Error making purchase', error);
  //     }
  //   }
  //   );
  // }

  // createMpButton(mpCode: string) {
  //   this.mercadoPago = new MercadoPagoJS();
  //   this.hidePrimaryButtonFn();
  //   this.mercadoPago.createButton(mpCode).then((message) => {
  //     this.isLoadingRequest = false;
  //     this.showMPButton = true;
  //     this.form.disable();
  //   }).catch((e) => {
  //     this.showErrorPopUp = true;
  //     this.errorMessage = "Lo sentimos, ha ocurrido un error. Por favor, vuelva a intentarlo mas tarde o comuniquese con el servicio de atención al cliente.";
  //     this.isLoadingRequest = false;
  //     this.showMPButton = false;
  //     this.showPrimaryButtonFn();
  //     this.form.enable();
  //   });
  // }

  onDeliveryMethodChange(choiceShippingRadioButton: string) {
    choiceShippingRadioButton === 'home_delivery' ?
      this.showFillAddressPopUp = true
      :
      this.showFillAddressPopUp = false;
  }

  openAddressForm(): void {
    this.showFillAddressPopUp = true;
  }

  receiveAddressFromForm(address: Address | null): void {
    this.addressFillOutByUser = address;
    this.closeModal('showFillAddressPopUp');;
  }

  closeModal(option: string) {

    switch (option) {
      // case 'purchaseFailed': this.showErrorPopUp = false;
      //   break;
      case 'showFillAddressPopUp': this.showFillAddressPopUp = false;
        break;
    }

  }

  // hidePrimaryButtonFn() {
  //   if (this.primaryButton) {
  //     this.primaryButton.nativeElement.style.display = 'none';
  //   }
  //   this.isLoadingRequest = true;
  // // }
  // showPrimaryButtonFn() {
  //   if (this.primaryButton) {
  //     this.primaryButton.nativeElement.style.display = 'flex';
  //     this.isDisabledButton = false;
  //   }
  //   this.isLoadingRequest = false;
  // }





}


