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

    // verifyDates() {
    //   const startDate = this.formDate.get('startDate')?.value;
    //   const endDate = this.formDate.get('endDate')?.value;
  
    //   const formattedStartDate = this.setFormatToDate(startDate);
    //   const formattedEndDate = this.setFormatToDate(endDate);
    //   console.log("verify Dates");
    //   console.log(formattedStartDate);
    //   console.log(formattedEndDate);

    //   if (formattedStartDate && formattedEndDate) {
    //     console.log("entro en el if del verify dates");
    //     this.updateDataView();
    //   }
    // }

    filterConfirmed : boolean | null = null;
    filterPaymentAccredited : boolean | null = null;

    filterByPaymentStatus() {
      // const posibilities = ['paid_and_delivered', 'paid_and_not_delivered', 'pending'];
      if(!this.formPaymentStatus.get('payment_status')?.value ) {
        console.log("aaa");
        return;
      }

      if (this.formPaymentStatus.get('payment_status')?.value == 'pending') {
        this.filterPaymentAccredited = false; // the payment is not accredited yet.. 
        this.filterConfirmed = null;
      }
      else if (this.formPaymentStatus.get('payment_status')?.value == 'paid_and_not_delivered') {
        this.filterPaymentAccredited = true; // the payment was accredited but it is not delivered
        this.filterConfirmed = false;
      }
      else if (this.formPaymentStatus.get('payment_status')?.value == 'paid_and_delivered') { 
        this.filterPaymentAccredited = true; // the payment was accredited and it was delivered
        this.filterConfirmed = true;
      }



      this.updateDataView();
      
    }

      
    setFormatToDate(dateString: string | null): string | null {
      if (!dateString) return null;
  
      const [year, month, day] = dateString.split('-');
      return `${day}-${month}-${year}`;
    }

  ngOnInit(): void {
    this.updateDataView();
  }

  updateDataView() {

    const filters : IPurchaseFilteredRequestDTO = {
      since: this.setFormatToDate(this.formDate.get('startDate')?.value) || '', // this.formDate.get('startDate')?.value,
      until: this.setFormatToDate(this.formDate.get('endDate')?.value) || '', // this.formDate.get('endDate')?.value,
      paymentAccredited: this.filterPaymentAccredited,
      confirmed: this.filterConfirmed,
    }

    console.log('updateDataView', filters);

    this._adminService.getAllPurchases(filters).subscribe(c => {
      console.log(c);
      this.purchases$ = c;

    })
  }

  clearFilters() {
    this.formDate.reset();
    this.formOrderId.reset();
    this.formPaymentStatus.reset();
    this.updateDataView();
  }



  showDetails(id: string) {
    this._router.navigate(['/admin-dashboard/billing', id]);
  }

  search_by_order_id() {
    const orderId = this.formOrderId.get('order_id')?.value;
    if(orderId) {
      this._adminService.getPurchaseById(orderId).subscribe({
        next: (purchase) => {
          this.purchases$ = [];
          this.purchases$.push(purchase);
        }
      })
    }
    
  }


}



export interface IPurchaseFilteredRequestDTO  {
  since?: string;
  until?: string;
  paymentAccredited?: boolean | null;
  confirmed?: boolean | null;
}