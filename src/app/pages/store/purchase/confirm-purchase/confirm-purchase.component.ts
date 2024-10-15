import { Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Address } from 'app/core/models/IMakePurchase';
import { IProduct_Cart_Entry_BK } from 'app/core/models/IProduct_Cart_Entry_BK';
import { CartService } from 'app/core/services/cart_service/cart-service.service';
import { PurchaseService } from 'app/core/services/purchase_service/purchase.service';
import { CustomForm } from 'app/core/utils/custom-form/custom.form';
import { MercadoPagoJS } from 'assets/js/MercadoPagoJS';
import { MessagePopUpComponent } from "../../../../shared/components/pop_up/message-pop-up/message-pop-up.component";
import { CustomCurrencyPipe } from "../../../../core/pipes/custom_currency/custom-currency.pipe";
import { NgClass, NgStyle } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FooterComponent } from "../../../../shared/components/footer/footer.component";
import { ReactiveFormsModule } from '@angular/forms';
import { of, switchMap } from 'rxjs';
import { AnErrorHasOcurredComponent } from "../../../../shared/components/an-error-has-ocurred/an-error-has-ocurred.component";

@Component({
  selector: 'app-confirm-purchase',
  standalone: true,
  imports: [MessagePopUpComponent, MatProgressSpinnerModule, CustomCurrencyPipe, NgClass, NgStyle, FooterComponent, ReactiveFormsModule, AnErrorHasOcurredComponent],
  templateUrl: './confirm-purchase.component.html',
  styleUrl: './confirm-purchase.component.scss'
})
export class ConfirmPurchaseComponent {  

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

  showFillAddressPopUp: boolean = false;
  isLoadingRequest: boolean = false;
  hidePrimaryButton: boolean = false;
  isDisabledButton: boolean = false;
  showMPButton: boolean = false;
  showErrorPopUp: boolean = false;
  errorMessage: string = '';
  deliveryMethod: string = '';
  paymentMethod: string = '';
  shippingInfo ?: Address ;

  thereWasAnError = signal<boolean>(false);
  anyParamNecessaryIsMissing = signal<boolean>(false);

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

    this._activatedRoute.params.subscribe(params => {

      if( params['deliveryMethod'] 
        && params['paymentMethod'] 
        && this.isAvailableThis_PaymentMethod(params['paymentMethod'].toLowerCase())
        && this.isAvailableThis_DeleliveryMethod(params['deliveryMethod'].toLowerCase()) 
      )
       {

        this.deliveryMethod = params['deliveryMethod'];
        this.paymentMethod = params['paymentMethod'];
      }else{
        this.anyParamNecessaryIsMissing.set(true);
      }


      if(this.deliveryMethod === 'shipping' && localStorage.getItem('shippingInfo')) {
        const obj = JSON.parse(localStorage.getItem('shippingInfo') || '{}');
        this.shippingInfo = obj;
      }
      else if (this.deliveryMethod === 'local'){

      }
      else{
        throw new Error ('Mandar al ups en Confirm Purchase, cuando no hay shippingInfo en local storage');
      }
      
    })

  }

  isAvailableThis_DeleliveryMethod( arg0 : string) {
    const availableDeliveryMethods = [ 'local', 'shipping' ];
    return availableDeliveryMethods.includes(arg0);
  }

  isAvailableThis_PaymentMethod( arg0 : string) {
    const availablePaymentMethods = [ 'mercado_pago' , 'in_local' ];
    return availablePaymentMethods.includes(arg0);
  }


  send(): void{
    this.isDisabledButton = true;
    
    if (this.deliveryMethod === 'local') {
      this.makePurchase(null , this.paymentMethod);
    }
    else if (this.deliveryMethod === 'shipping' && this.shippingInfo) {
      this.makePurchase(this.shippingInfo , this.paymentMethod);
    }
    else{
      this.anyParamNecessaryIsMissing.set(true);
    }

  }



  makePurchase(address: Address | null , paymentMethod: string) {
    let paymentMethodNumber : number = 0;
    if(paymentMethod === 'mercado_pago'){
      paymentMethodNumber = 1;
    }else if (paymentMethod === 'in_local'){
      paymentMethodNumber = 2;
    }else{

      throw new Error('Mandar al ups en el confirm purchase');

    }

   // Usamos pipe y switchMap para encadenar los observables
  this._cartService.getAllProducts().pipe(
    
    switchMap(products => {
      
      let jsonProducts: { [key: string]: number } = {};
      products.forEach(element => {
        jsonProducts[element.productId] = element.quantity;
      });

      // Llamamos al segundo observable solo cuando el primero termina
      return this._PurchaseService.makePurchaseInService(address, paymentMethodNumber, jsonProducts);
    })
  ).subscribe({
    next: (response) => {
      if(response) {
        this._cartService.getAllProducts().subscribe();
        this.createMpButton(response);

      }else{
        this._cartService.getAllProducts().subscribe();
        this._router.navigate(['purchase-success'])
      }
    },
    error: (error) => {
      
    }
  });
 

   
  }

  createMpButton(mpCode: string) {
    this.mercadoPago = new MercadoPagoJS();
    this.hidePrimaryButtonFn();
    this.mercadoPago.createButton(mpCode).then((message) => {
      this.isLoadingRequest = false;
      this.showMPButton = true;
      // this.form.disable();
    }).catch((e) => {
      this.showErrorPopUp = true;
      this.errorMessage = "Lo sentimos, ha ocurrido un error. Por favor, vuelva a intentarlo mas tarde o comuniquese con el servicio de atención al cliente.";
      this.isLoadingRequest = false;
      this.showMPButton = false;
      this.showPrimaryButtonFn();
      // this.form.enable();
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

  closeModal(option: string) {

    switch (option) {
      case 'purchaseFailed': this.showErrorPopUp = false;
        break;
      case 'showFillAddressPopUp': this.showFillAddressPopUp = false;
        break;
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



  

}
