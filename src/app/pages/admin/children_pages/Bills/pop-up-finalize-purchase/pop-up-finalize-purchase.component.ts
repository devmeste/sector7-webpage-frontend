import { NgClass } from '@angular/common';
import { Component, inject, Input, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomFormPopUp } from 'app/core/utils/custom-form-pop-up/custom.form.pop.up';
import { InputDangerTextComponent } from '@shared/components/inputs/input-danger-text/input-danger-text.component';
import { SpinnerS7Component } from "../../../../../shared/components/spinners/spinner-s7/spinner-s7.component";
import { AdminService } from 'app/core/services/admin_service/admin.service';
import { IPurchase } from 'app/core/models/IPurchase';

@Component({
  selector: 'app-pop-up-finalize-purchase',
  standalone: true,
  imports: [
    ReactiveFormsModule, NgClass,
    InputDangerTextComponent,
    SpinnerS7Component
  ],
  templateUrl: './pop-up-finalize-purchase.component.html',
  styleUrl: './pop-up-finalize-purchase.component.scss',
})
export class PopUpFinalizePurchaseComponent extends CustomFormPopUp {
  loading: boolean = false;
  @Input({ required: true }) purchase_id!: string;

  private _adminService = inject(AdminService);
  purchaseWasUpdatedSuccesfully = signal<boolean>(false);
  thereWasAnError = signal<boolean>(false);
  errorMessage = signal<string>('');

  purchase$ !: IPurchase;



  override ngOnInit(): void {
    super.ngOnInit();
    this._adminService.getPurchaseById(this.purchase_id).subscribe(purchase => {
      this.purchase$ = purchase;

      if (!this.purchaseHasShipmentAndNeedsExpeditor()) {
        this.send();
      }
    })
  }


  //Si tiene shipment, tiene que tener Expeditor.. 

  override initializeForm(): void {
    this.form = this.formBuilder.group({
      trackId: '',
      expeditor: '',
    });
  }

  override send(): void {
    this.loading = true;

    const finalizePurchaseDTO: IFinalizePurchaseDTO = {
      id: this.purchase_id,
      trackId: '',
      expeditor: '',
    }

    if (this.purchaseHasShipmentAndNeedsExpeditor()) {
      finalizePurchaseDTO.trackId = this.form.value.trackId;
      finalizePurchaseDTO.expeditor = this.form.value.expeditor;
    }

    this._adminService.finalizePurchase(finalizePurchaseDTO).subscribe({
      next: (response) => {
        this.loading = false;
        console.log(response);
        this.purchaseWasUpdatedSuccesfully.set(true);
      },
      error: (error) => {
        this.thereWasAnError.set(true);
        this.errorMessage.set(error.error.message);
        this.loading = false;
      }
    })
  }

  purchaseHasShipmentAndNeedsExpeditor() {
    return this.purchase$ && this.purchase$.shipment;
  }

}
export type IFinalizePurchaseDTO = {
  id: string;
  trackId: string;
  expeditor: string;
}