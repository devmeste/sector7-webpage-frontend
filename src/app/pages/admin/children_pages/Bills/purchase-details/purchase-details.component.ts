import { CurrencyPipe, JsonPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IPurchase } from 'app/core/models/IPurchase';
import { AdminService } from 'app/core/services/admin_service/admin.service';
import { InputDangerTextComponent } from "../../../../../shared/components/inputs/input-danger-text/input-danger-text.component";
import { CustomCurrencyPipe } from "../../../../../core/pipes/custom_currency/custom-currency.pipe";
import { MatIcon } from '@angular/material/icon';
import { PopUpFinalizePurchaseComponent } from "../pop-up-finalize-purchase/pop-up-finalize-purchase.component";
import { PopUpEditPurchaseComponent } from "../pop-up-edit-purchase/pop-up-edit-purchase.component";
import { ConfirmPopUpComponent } from "../../../../../shared/components/pop_up/confirm-pop-up/confirm-pop-up.component";
import { MessagePopUpComponent } from "../../../../../shared/components/pop_up/message-pop-up/message-pop-up.component";

@Component({
  selector: 'app-purchase-details',
  standalone: true,
  imports: [JsonPipe, InputDangerTextComponent, CurrencyPipe, CustomCurrencyPipe, MatIcon, PopUpFinalizePurchaseComponent, PopUpEditPurchaseComponent, ConfirmPopUpComponent, MessagePopUpComponent],
  templateUrl: './purchase-details.component.html',
  styleUrls: ['./purchase-details.component.scss', '../../../../../shared/styles/admin_table.scss']
})
export class PurchaseDetailsComponent {


  _adminService = inject(AdminService);
  _router = inject(Router);
  _activatedRoute = inject(ActivatedRoute);
  purchases$ !: IPurchase[];


  purchase!: IPurchase | undefined;

  purchase_id: string = '';

  showPopUpFinalizePurchase = signal<boolean>(false);
  showPopUpEditPurchase = signal<boolean>(false);
  purchaseWasCancelled = signal<boolean>(false); //puede que se vaya
  showConfirmPopUpPurchaseCancel = signal<boolean>(false);

  ngOnInit(): void {

    this._activatedRoute.params.subscribe(params => {
      this.purchase_id = params['id'];
    });

    this.loadPurchaseDetails();


  }
  loadPurchaseDetails() {
    this._adminService.getAllPurchases().subscribe(c => {
      this.purchases$ = c;      
      this.purchase = this.purchases$.find(purchase => purchase.id === this.purchase_id);
      if (this.purchase == undefined) {
        this._router.navigate(['/admin-dashboard/billing']);
      }
    })
  }

  confirmCancelAction() {
    
    this._adminService.cancelPurchase(this.purchase_id).subscribe( {
      next: () => {
        // this.loadPurchaseDetails();
        this.purchaseWasCancelled.set(true);
      },
      error: (error) => {
        // TODO: handle error
      }
    })
  }
    
}


