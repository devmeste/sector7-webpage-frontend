import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PaymentMethods } from 'app/core/models/enums_and_types/PaymentMethods';
import { PurchaseService } from 'app/core/services/purchase_service/purchase.service';
import { CustomFormPopUp } from 'app/core/utils/custom-form-pop-up/custom.form.pop.up';

@Component({
  selector: 'app-change-payment-method-pop-up',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './change-payment-method-pop-up.component.html',
  styleUrl: './change-payment-method-pop-up.component.scss',
})
export class ChangePaymentMethodPopUpComponent  extends CustomFormPopUp{

  @Input ({required: true}) id !: string;
  private _purchaseService = inject(PurchaseService);
  

  paymentMethodSelected !: number;
  
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
        next: () => {
          this.closeUpdateModal();

        },
        error(error : HttpErrorResponse) {
            throw new Error ('An error has ocurred in change payment method');
        }

      })

    } 
  
  }
}

type PaymentMethod = {
  name: string;
  value: number;
}
