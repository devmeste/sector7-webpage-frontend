import { NgClass, NgStyle } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, inject, Input, signal, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PaymentMethods } from 'app/core/models/enums/PaymentMethods';
import { PurchaseService } from 'app/core/services/purchase_service/purchase.service';
import { CustomFormPopUp } from 'app/core/utils/custom-form-pop-up/custom.form.pop.up';
import { MercadoPagoJS } from 'assets/js/MercadoPagoJS';

@Component({
  selector: 'app-change-payment-method-pop-up',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgClass,
    NgStyle,
    MatProgressSpinnerModule
  ],
  templateUrl: './change-payment-method-pop-up.component.html',
  styleUrl: './change-payment-method-pop-up.component.scss',
})
export class ChangePaymentMethodPopUpComponent  extends CustomFormPopUp{

  @Input ({required: true}) id !: string;
  private _purchaseService = inject(PurchaseService);
  
  paymentMethodSelected !: number;

  showSuccessMessageCommon = signal<boolean>(false);
  
  typesOfPaymentMethods : PaymentMethod[] = [
    { name: 'Mercado Pago', value : PaymentMethods.mercado_pago },
    { name: 'En el local', value : PaymentMethods.in_local },
  ]

  override initializeForm(): void {
    this.form = this.formBuilder.group({
      payment_method : [this.typesOfPaymentMethods[0].value, [Validators.required]]
    })
  }

  override send(): void {
    if(this.form.valid){
      this.paymentMethodSelected = <number> this.form.get('payment_method')?.value;
      this._purchaseService.changePaymentMethod( this.id, this.paymentMethodSelected).subscribe({
        next: (response) => {
          if(this.paymentMethodSelected == PaymentMethods.mercado_pago){
            // genero el boton 
            this.createMpButton(response.message);
          }
          else{
            this.showSuccessMessageCommon.set(true);
          }
        },
        error(error : HttpErrorResponse) {
            throw new Error ('An error has ocurred in change payment method');
        }

      })

    } 
  
  }


  // Clase Mercado Pago Button
  @ViewChild('primaryButton') primaryButton !: ElementRef<HTMLButtonElement>;
  mercadoPago !: MercadoPagoJS;
  isLoadingRequest: boolean = false;
  showMPButton: boolean = false;
  showErrorPopUp: boolean = false;
  errorMessage: string = '';
  isDisabledButton: boolean = false;

  
  createMpButton(mpCode: string) {
    this.mercadoPago = new MercadoPagoJS();
    this.hidePrimaryButtonFn();
    this.mercadoPago.createButton(mpCode).then((message) => {
      this.isLoadingRequest = false;
      this.showMPButton = true;
    }).catch((e) => {
      this.showErrorPopUp = true;
      this.errorMessage = "Lo sentimos, ha ocurrido un error. Por favor, vuelva a intentarlo mas tarde o comuniquese con el servicio de atención al cliente.";
      this.isLoadingRequest = false;
      this.showMPButton = false;
      this.showPrimaryButtonFn();
    });
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

type PaymentMethod = {
  name: string;
  value: number;
}
