import { CommonModule } from '@angular/common';
import { Component, inject, Input, signal } from '@angular/core';
import { SpinnerS7Component } from "../../../../../shared/components/spinners/spinner-s7/spinner-s7.component";
import { ReactiveFormsModule } from '@angular/forms';
import { CustomFormPopUp } from 'app/core/utils/custom-form-pop-up/custom.form.pop.up';
import { AdminService } from 'app/core/services/admin_service/admin.service';
import { IPurchase } from 'app/core/models/IPurchase';

@Component({
  selector: 'app-pop-up-edit-purchase',
  standalone: true,
  imports: [
    CommonModule,
    SpinnerS7Component,
    ReactiveFormsModule
],
  templateUrl: './pop-up-edit-purchase.component.html',
  styleUrl: './pop-up-edit-purchase.component.scss',
})
export class PopUpEditPurchaseComponent extends CustomFormPopUp {


  @Input({required: true}) purchaseId !: string
  _adminService = inject(AdminService)
  purchase$ !: IPurchase ;
  shipmentStatusArray : String[]= [];
  
  purchaseWasEditedSuccesfully = signal<boolean>(false);
  loading : boolean = false;

  override ngOnInit(): void {
    super.ngOnInit();
    this._adminService.getAllShipmentStatus().subscribe(response => {
      this.shipmentStatusArray = response.status;
      
      console.log(this.shipmentStatusArray);
    })
  } 

  override initializeForm(): void {
    this.form = this.formBuilder.group({
      shipmentStatus: null,
      trackId: null,
      expeditor: null,
      makePaymentAccredited: false,
      makeLocalPayment: false
    //   {
    //     "status": "Tu compra está lista para despachar",
    //     "trackId": "dfasrtf-gdfsg15-12",
    //     "expeditor": "Urbano",
    //     "makePaymentAccredited": true,
    //     "makeLocalPayment": true 
    // }
    })

    this._adminService.getPurchaseById(this.purchaseId).subscribe(purchase => {
      this.purchase$ = purchase;
      if(this.purchase$.shipment?.status){
        this.form.get('status')?.setValue(purchase.shipment?.status);
      }
    })
  }
  override send(): void {
   this._adminService.editPurchase(this.purchaseId, this.form.value).subscribe({
     next: () => this.purchaseWasEditedSuccesfully.set(true),
     error: () => this.purchaseWasEditedSuccesfully.set(false)
   })
  }

 }
