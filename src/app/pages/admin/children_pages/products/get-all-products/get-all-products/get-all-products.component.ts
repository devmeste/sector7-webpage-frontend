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
// import{} from ;
@Component({
  selector: 'app-get-all-products',
  standalone: true,
  templateUrl: './get-all-products.component.html',
  styleUrls: ['./get-all-products.component.scss', "../../../admin_table.scss"],
  imports: [MatPaginatorModule, MatTableModule, MatIcon, CurrencyPipe, InputDangerTextComponent, MessagePopUpComponent]
})
export class GetAllProductsComponent {


  _adminService: AdminService = inject(AdminService);
  products$!: BKProduct[];

  productDeletedSuccessfully = false;
  productDeletionFailed: boolean = false;
  errorMessage: any;

  ngOnInit(): void {
    this._adminService.getAllProducts().subscribe(productResponse => {
      console.log(productResponse);
      this.products$ = productResponse.products;
    });
  }

  deleteProduct(id: string) {
    this._adminService.deleteProduct(id).subscribe({
      next: (success) => {
        this.productDeletedSuccessfully = success
        this._adminService.getAllProducts().subscribe(productResponse => {
          this.products$ = productResponse.products;
        })
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
      case "productDeletionFailed" : this.productDeletionFailed = false;
        break;
    }
  }
}
