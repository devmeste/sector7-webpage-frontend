import { CurrencyPipe, JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IPurchase } from 'app/core/models/IPurchase';
import { AdminService } from 'app/core/services/admin_service/admin.service';
import { InputDangerTextComponent } from "../../../../../shared/components/inputs/input-danger-text/input-danger-text.component";
@Component({
  selector: 'app-purchase-details',
  standalone: true,
  imports: [JsonPipe, InputDangerTextComponent ,CurrencyPipe],
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
        console.log("No se encontro la compra");
        this._router.navigate(['/admin-dashboard/billing']);
      }
    })
  }
}


