import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { IBillsBetweenDates } from 'app/core/models/IBillsBetweenDates';
import { AdminService } from 'app/core/services/admin_service/admin.service';
import { InputDangerTextComponent } from "../../../../../shared/components/inputs/input-danger-text/input-danger-text.component";
// import { PurchaseDetailsPopUpComponent } from "../purchase-details-pop-up/purchase-details-pop-up.component";
import { IPurchase } from 'app/core/models/IPurchase';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-get-all-bills',
  standalone: true,
  imports: [MatIcon, InputDangerTextComponent, ReactiveFormsModule],
  templateUrl: './get-all-bills.component.html',
  styleUrls: ['./get-all-bills.component.scss', "../../../../../shared/styles/admin_table.scss"],
})
export class GetAllBillsComponent {
  clearFilters() {
    this.form.reset();
    this.updateDataView();
  }

  _adminService = inject(AdminService);
  _router = inject(Router);
  _formBuilder = inject(FormBuilder);
  purchases$ !: IPurchase[];

  form: FormGroup = this._formBuilder.group({
    startDate: [''],
    endDate: ['']
  });

  verifyDates() {
    const startDate = this.form.get('startDate');
    const endDate = this.form.get('endDate');

    if (startDate?.value && endDate?.value) {
      this.updateDataViewWithDates();
    }
  }

  ngOnInit(): void {
    this.updateDataView();
  }

  updateDataView() {
    this._adminService.getAllPurchases().subscribe(c => {
      this.purchases$ = c;
    })
  }

  updateDataViewWithDates() {
    this._adminService.getAllPurchasesBetweenDates(this.form.get('startDate')?.value, this.form.get('endDate')?.value).subscribe(c => {
      this.purchases$ = c.purchases;
    })
  }

  showDetails(id: string) {
    this._router.navigate(['/admin-dashboard/billing', id]);
  }



}

