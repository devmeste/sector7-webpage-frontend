import { Component, inject } from '@angular/core';
import BKProduct from 'app/core/models/BKProduct';
import { AdminService } from 'app/core/services/admin_service/admin.service';
import { ProductsUpdatePopUpComponent } from '../products-update-pop-up/products-update-pop-up.component';
import { MessagePopUpComponent } from '@shared/components/pop_up/message-pop-up/message-pop-up.component';
import { InputDangerTextComponent } from '@shared/components/inputs/input-danger-text/input-danger-text.component';
import { CurrencyPipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-get-all-products-pending',
  standalone: true,
  imports: [MatPaginatorModule, MatTableModule, MatIcon, CurrencyPipe, InputDangerTextComponent, MessagePopUpComponent, ProductsUpdatePopUpComponent],
  templateUrl: './get-all-products-pending.component.html',
  styleUrls: ['./get-all-products-pending.component.scss', "../../../../../shared/styles/admin_table.scss"]
})
export class GetAllProductsPendingComponent {

  _adminService: AdminService = inject(AdminService);
  products$!: BKProduct[];

  productUpdatedSuccessfully = false;
  productUpdateFailed: boolean = false;
  errorMessage: any;

  showUpdatePopUp = false;
  update_id = '';
  product_USD_price!: number;

  pageSize = 5;
  pageSizeOptions: number[] | readonly number[] = [5, 10, 25, 50];

  ngOnInit(): void {
    this.updateProductsState();
  }

  deleteProduct(id: string) {
    this._adminService.deleteProduct(id).subscribe({
      next: (success) => {
        this.productUpdatedSuccessfully = success
        this.updateProductsState();
      },
      error: (e) => {
        this.productUpdateFailed = true
        this.errorMessage = e.error.message
      },
    }
    );
  }


  closeModal(option: string) {

    switch (option) {
      case "productUpdatedSuccessfully": this.productUpdatedSuccessfully = false;
        break;
      case "productUpdateFailed": this.productUpdateFailed = false;
        break;
      case "showUpdatePopUp": this.showUpdatePopUp = false;
        break;
    }
    this.updateProductsState();
  }

  showUpdatePopUpMethod(id: string, price: number) {
    this.showUpdatePopUp = true;
    this.update_id = id;
    this.product_USD_price = price;
  }


  updateProductsState() {
    this._adminService.getAllProductsPending().subscribe(productResponse => {
      this.products$ = productResponse.products;
    })
  }





}
