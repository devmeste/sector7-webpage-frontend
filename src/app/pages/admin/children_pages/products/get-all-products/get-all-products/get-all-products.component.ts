import { AsyncPipe, CurrencyPipe, JsonPipe, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { ProductResponse, Pagination } from 'app/core/models/ProductResponse';
import BKProduct from 'app/core/models/BKProduct';
import { AdminService } from 'app/core/services/admin_service/admin.service';
import { InputDangerTextComponent } from "../../../../../../shared/components/inputs/input-danger-text/input-danger-text.component";
import { MessagePopUpComponent } from "../../../../../../shared/components/pop_up/message-pop-up/message-pop-up.component";
import { ProductsUpdatePopUpComponent } from "../../products-update-pop-up/products-update-pop-up.component";
import { ConfirmPopUpComponent } from "../../../../../../shared/components/pop_up/confirm-pop-up/confirm-pop-up.component";
// import{} from ;
@Component({
  selector: 'app-get-all-products',
  standalone: true,
  templateUrl: './get-all-products.component.html',
  styleUrls: ['./get-all-products.component.scss', "../../../../../../shared/styles/admin_table.scss"],
  imports: [MatPaginatorModule, MatTableModule, MatIcon, CurrencyPipe, InputDangerTextComponent, MessagePopUpComponent, ProductsUpdatePopUpComponent, ConfirmPopUpComponent]
})
export class GetAllProductsComponent {


  _adminService: AdminService = inject(AdminService);
  products$!: BKProduct[];

  // MODAL POP-UPS 
  productDeletedSuccessfully = false;
  productDeletionFailed: boolean = false;
  errorMessage: any;
  showUpdatePopUp = false;
  update_id = '';
  product_USD_price!: number;

  // PAGINATOR
  pageSizeOptions: number[] | readonly number[] = [5, 10, 25, 50];
  totalItems = 0;
  pageSize = 10;
  currentPage = 0;
  totalPages = 0;

  // Confirm Delete 
  userConfirmDelete = false;
  showPopUpToConfirmDelete = false;
  productIdToDelete = "";

  ngOnInit(): void {
    this.updateProductsState();
  }

  deleteProduct(id: string) {
    this._adminService.deleteProduct(id).subscribe({
      next: (success) => {
        this.productDeletedSuccessfully = success
        this.updateProductsState();
      },
      error: (e) => {
        this.productDeletionFailed = true
        this.errorMessage = e.error.message
      },
    }
    );
  }


  closeModal(option: string) {

    switch (option) {
      case "productDeletedSuccessfully": this.productDeletedSuccessfully = false;
        break;
      case "productDeletionFailed": this.productDeletionFailed = false;
        break;
      case "showUpdatePopUp": this.showUpdatePopUp = false;
        break;
      case "showPopUpToConfirmDelete": {
        this.showPopUpToConfirmDelete = false;
        this.productIdToDelete = "";
      }
        break;
    }
  }

  showUpdatePopUpMethod(id: string, price: number) {
    this.showUpdatePopUp = true;
    this.update_id = id;
    this.product_USD_price = price;
  }


  updateProductsState() {
    console.log("Se ejecuto");
    this._adminService.getAllProductsForAdmin(this.currentPage + 1, this.pageSize).subscribe(productResponse => {
      this.products$ = productResponse.products;
      this.totalPages = productResponse.pagination.totalPages;
      this.totalItems = productResponse.pagination.totalElements;
    })
  }

  pageChanged(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.updateProductsState();
  }




  askToConfirmDelete(id: string) {
    this.showPopUpToConfirmDelete = true;
    this.productIdToDelete = id;
  }

  confirmDeleteAction() {
    this.deleteProduct(this.productIdToDelete);
    this.updateProductsState();
    this.closeModal("showPopUpToConfirmDelete");
  }
}
