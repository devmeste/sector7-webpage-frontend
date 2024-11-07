import { Component, ElementRef, inject, signal, Signal, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Address } from 'app/core/models/IMakePurchase';
import { IProduct_Cart_Entry_BK } from 'app/core/models/IProduct_Cart_Entry_BK';
import { CartService } from 'app/core/services/cart_service/cart-service.service';
import { PurchaseService } from 'app/core/services/purchase_service/purchase.service';
import { CustomForm } from 'app/core/utils/custom-form/custom.form';
import { MercadoPagoJS } from 'assets/js/MercadoPagoJS';
import { MessagePopUpComponent } from "../../../../shared/components/pop_up/message-pop-up/message-pop-up.component";
import { FillAddressPopUpComponent } from "../fill-address-pop-up/fill-address-pop-up.component";
import { CustomCurrencyPipe } from "../../../../core/pipes/custom_currency/custom-currency.pipe";
import { NgClass, NgStyle } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FooterComponent } from "../../../../shared/components/footer/footer.component";
import { AnErrorHasOcurredComponent } from '@shared/components/messages/an-error-has-ocurred/an-error-has-ocurred.component';

@Component({
  selector: 'app-payment-method',
  standalone: true,
  imports: [MessagePopUpComponent, FillAddressPopUpComponent, MatProgressSpinnerModule, CustomCurrencyPipe, NgClass, NgStyle, ReactiveFormsModule, FooterComponent, AnErrorHasOcurredComponent],
  templateUrl: './payment-method.component.html',
  styleUrl: './payment-method.component.scss'
})

export class PaymentMethodComponent  extends CustomForm {
 
  @ViewChild('primaryButton') primaryButton !: ElementRef<HTMLButtonElement>;
  shipping: any;

  _PurchaseService = inject(PurchaseService);
  _cartService = inject(CartService);
  _router = inject(Router);
  _activatedRoute = inject(ActivatedRoute);

  mercadoPago !: MercadoPagoJS;
  products$ !: IProduct_Cart_Entry_BK[];
  cartQuantity$ !: number;
  total$ !: number;
  addressFillOutByUser: Address | null = null;

  delivery_method : string = '';

  showFillAddressPopUp: boolean = false;
  isLoadingRequest: boolean = false;
  hidePrimaryButton: boolean = false;
  isDisabledButton: boolean = false;
  showMPButton: boolean = false;
  showErrorPopUp: boolean = false;
  errorMessage: string = '';

  showErrorPage = signal<boolean>(false);


  override initializeForm(): void {
    this.form = this.formBuilder.group({
      paymentMethod: ['in_local']
    })
  }

  override ngOnInit(): void {
    super.ngOnInit();

    this._activatedRoute.params.subscribe(params => {
      if (params['deliveryMethod'] && this.isAvailableThisDeleliveryMethod(params['deliveryMethod'])) {
        this.delivery_method = params['deliveryMethod'];
      }
      else{
        this.showErrorPage.set(true);
      }
    })

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


  isAvailableThisDeleliveryMethod( arg0 : string) {
    const availableDeliveryMethods = [ 'local', 'shipping' ];
    return availableDeliveryMethods.includes(arg0);
  }


  override send($event: SubmitEvent): void {
    $event.preventDefault();

    const valueSelected = this.form.get('paymentMethod')?.value;

    if(valueSelected === 'local' && localStorage.getItem('shippingInfo') ){
      // Por si primero eligio shipping, grabo el envio, y luego volvio a elegir en el local
      localStorage.removeItem('shippingInfo');
    }

    if(valueSelected && this.isAvailableThisDeleliveryMethod(this.delivery_method)){
      this._router.navigate(['buying/'+ this.delivery_method + '/payment-method/' + valueSelected + '/confirm-purchase']);
    }else{
      throw new Error('Mandar al ups');
    }


  }





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

  // onDeliveryMethodChange(choiceShippingRadioButton: string) {
  //   choiceShippingRadioButton === 'home_delivery' ?
  //     this.showFillAddressPopUp = true
  //     :
  //     this.showFillAddressPopUp = false;
  // }

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
      // case 'showFillAddressPopUp': this.showFillAddressPopUp = false;
      //   break;
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
      this.isDisabledButton = false;
    }
    this.isLoadingRequest = false;
  }



  // goToPaymentMethod() {
  //   // in this case, number 1 means the user chose in_local and 2 is home_delivery

  //   if(!this.form.get('deliveryMethod')?.value ){
  //     throw new Error('Invalid delivery method');
  //   }
  //   else{
  //     if(this.form.get('deliveryMethod')?.value === 'home_delivery'){
  //       //home_delivery
  //       this._router.navigate(['buying/2/payment-method']);
  //     }
  //     else{
  //       //in_local
  //       this._router.navigate(['buying/1/payment-method']);
  //     }
  //   }

  // }
}
