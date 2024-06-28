import { AsyncPipe, CurrencyPipe, JsonPipe, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { ProductResponse, Pagination } from 'app/core/models/ProductResponse';
import BKProduct from 'app/core/models/BKProduct';
import { AdminService } from 'app/core/services/admin_service/admin.service';
import { InputDangerTextComponent } from "../../../../../../shared/components/inputs/input-danger-text/input-danger-text.component";
import { MessagePopUpComponent } from "../../../../../../shared/components/pop_up/message-pop-up/message-pop-up.component";
import { ProductsUpdatePopUpComponent } from "../../products-update-pop-up/products-update-pop-up.component";
// import{} from ;
@Component({
    selector: 'app-get-all-products',
    standalone: true,
    templateUrl: './get-all-products.component.html',
    styleUrls: ['./get-all-products.component.scss', "../../../../../../shared/styles/admin_table.scss"],
    imports: [MatPaginatorModule, MatTableModule, MatIcon, CurrencyPipe, InputDangerTextComponent, MessagePopUpComponent, ProductsUpdatePopUpComponent]
})
export class GetAllProductsComponent {


  _adminService: AdminService = inject(AdminService);
  products$!: BKProduct[];

  productDeletedSuccessfully = false;
  productDeletionFailed: boolean = false;
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
    }
    this.updateProductsState();
  }

  showUpdatePopUpMethod(id: string , price : number) {
    this.showUpdatePopUp = true;
    this.update_id = id;
    this.product_USD_price= price;
  }



  updateProductsState(){
    this._adminService.getAllProductsForAdmin().subscribe(productResponse => {
      this.products$ = productResponse.products;
    })
  }
}
