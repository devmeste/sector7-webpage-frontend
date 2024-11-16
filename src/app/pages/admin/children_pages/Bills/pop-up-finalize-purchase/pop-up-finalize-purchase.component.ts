import { NgClass } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomFormPopUp } from 'app/core/utils/custom-form-pop-up/custom.form.pop.up';
import { InputDangerTextComponent } from '@shared/components/inputs/input-danger-text/input-danger-text.component';
import { SpinnerS7Component } from "../../../../../shared/components/spinners/spinner-s7/spinner-s7.component";
import { AdminService } from 'app/core/services/admin_service/admin.service';

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
  @Input({required: true}) purchase_id!: string ;
  
  private _adminService = inject(AdminService);
purchaseWasUpdatedSuccesfully: any;

  override ngOnInit(): void {
    super.ngOnInit();
    // this._adminService.getPurchaseById(this.purchase_id).subscribe(purchase => {
      
    // })
  }


  override initializeForm(): void {
    this.form = this.formBuilder.group({
      trackId : '',
      expeditor : '',
    });
   }
  override send(): void {
    this.loading = true;
    const {trackId , expeditor} = this.form.value;

    this._adminService.finalizePurchase(this.purchase_id, trackId, expeditor).subscribe(() => {
      this.loading = false;
      
    })
  }


 }
