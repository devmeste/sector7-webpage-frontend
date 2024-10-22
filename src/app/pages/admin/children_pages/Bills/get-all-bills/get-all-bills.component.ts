import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { IBillsBetweenDates } from 'app/core/models/IBillsBetweenDates';
import { AdminService } from 'app/core/services/admin_service/admin.service';
import { InputDangerTextComponent } from "../../../../../shared/components/inputs/input-danger-text/input-danger-text.component";
// import { PurchaseDetailsPopUpComponent } from "../purchase-details-pop-up/purchase-details-pop-up.component";
import { IPurchase } from 'app/core/models/IPurchase';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomDatePipe } from 'app/core/pipes/custom-date-pipe.pipe';


@Component({
  selector: 'app-get-all-bills',
  standalone: true,
  imports: [MatIcon, InputDangerTextComponent, ReactiveFormsModule, CustomDatePipe],
  templateUrl: './get-all-bills.component.html',
  styleUrls: ['./get-all-bills.component.scss', "../../../../../shared/styles/admin_table.scss"],
  })
  export class GetAllBillsComponent {

    clearFilters() {
      this.formDate.reset();
      this.formOrderId.reset();
      this.formPaymentStatus.reset();
      this.updateDataView();
    }

    _adminService = inject(AdminService);
    _router = inject(Router);
    _formBuilder = inject(FormBuilder);
    purchases$ !: IPurchase[];

    formDate: FormGroup = this._formBuilder.group({
      startDate: [''],
      endDate: ['']
    });

    formOrderId: FormGroup = this._formBuilder.group({
      order_id: ['', Validators.required]
    })

    formPaymentStatus: FormGroup = this._formBuilder.group({
      payment_status: ['', Validators.required]
    })

    verifyDates() {
      const startDate = this.formDate.get('startDate')?.value;
      const endDate = this.formDate.get('endDate')?.value;
  
      const formattedStartDate = this.formatDate(startDate);
      const formattedEndDate = this.formatDate(endDate);
    
      if (formattedStartDate && formattedEndDate) {
        this.updateDataViewWithDates( formattedStartDate, formattedEndDate);
      }
    }

    formatDate(dateString: string | null): string | null {
      if (!dateString) return null;
  
      const [year, month, day] = dateString.split('-');
      return `${day}-${month}-${year}`;
    }

  ngOnInit(): void {
    this.updateDataView();
  }

  updateDataView() {
    this._adminService.getAllPurchases().subscribe(c => {
      this.purchases$ = c;
    })
  }

  updateDataViewWithDates(startDate: string, endDate: string) {
    this._adminService.getAllPurchasesBetweenDates(startDate,endDate).subscribe(c => {
      this.purchases$ = c.purchases;
    })
  }

  showDetails(id: string) {
    this._router.navigate(['/admin-dashboard/billing', id]);
  }

  search_by_order_id() {
    const orderId = this.formOrderId.get('order_id')?.value;
    if(orderId) {
      this._adminService.getPurchasetById(orderId).subscribe({
        next: (purchase) => {
          this.purchases$ = [];
          this.purchases$.push(purchase);
        }
      })
    }
    
  }

}

