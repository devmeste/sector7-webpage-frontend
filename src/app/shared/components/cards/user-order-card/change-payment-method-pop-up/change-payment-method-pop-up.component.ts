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
  showSuccessMessageMercadoPago = signal<boolean>(false);

  updateButtonIsDisabled = false;
  
  typesOfPaymentMethods : PaymentMethod[] = [
    { name: 'Mercado Pago', value : PaymentMethods.mercado_pago },
    { name: 'En el local', value : PaymentMethods.in_local },
  ]
  isLoadingMP = false;

  override initializeForm(): void {
    this.form = this.formBuilder.group({
      payment_method : [this.typesOfPaymentMethods[0].value, [Validators.required]]
    })
  }

  override send(): void {
    this.updateButtonIsDisabled = true;
    

    if(this.form.valid){
      this.paymentMethodSelected = <number> this.form.get('payment_method')?.value;
      this._purchaseService.changePaymentMethod( this.id, this.paymentMethodSelected).subscribe({
        next: (response) => {
          if(this.paymentMethodSelected == PaymentMethods.mercado_pago){
            // genero el boton 
            this.showSuccessMessageMercadoPago.set(true);

              this.createMpButton(response.message);
          }
          else if (this.paymentMethodSelected == PaymentMethods.in_local){ 
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
    this.isLoadingMP = true;
    this.mercadoPago = new MercadoPagoJS();
    this.mercadoPago.createButton(mpCode).then((message) => {
      this.isLoadingMP = false;
    }).catch((e) => {
      this.showErrorPopUp = true;
      this.errorMessage = "Lo sentimos, ha ocurrido un error. Por favor, vuelva a intentarlo mas tarde o comuniquese con el servicio de atención al cliente.";
      this.isLoadingRequest = false;
      this.showMPButton = false;
    });
  }

  

}

type PaymentMethod = {
  name: string;
  value: number;
}
