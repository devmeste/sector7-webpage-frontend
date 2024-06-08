import { AsyncPipe, CurrencyPipe, JsonPipe, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { ProductResponse, BKProduct, Pagination } from 'app/core/models/ProductResponse';
import { AdminService } from 'app/core/services/admin_service/admin.service';
import { InputDangerTextComponent } from "../../../../../../shared/components/inputs/input-danger-text/input-danger-text.component";
// import{} from ;
@Component({
    selector: 'app-get-all-products',
    standalone: true,
    templateUrl: './get-all-products.component.html',
    styleUrls: ['./get-all-products.component.scss', "../../../admin_table.scss"],
    imports: [MatPaginatorModule, MatTableModule, MatIcon, CurrencyPipe, InputDangerTextComponent]
})
export class GetAllProductsComponent {

  _adminService: AdminService = inject(AdminService);


  products$!: BKProduct[];

  ngOnInit(): void {
    this._adminService.getAllProducts().subscribe(productResponse => {
      console.log(productResponse);
      this.products$ = productResponse.products;
    });
  }

  deleteProduct(id: string) {
    throw new Error('Method not implemented.');
  }

}
