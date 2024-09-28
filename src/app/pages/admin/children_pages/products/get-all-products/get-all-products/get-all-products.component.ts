import { AsyncPipe, CurrencyPipe, JsonPipe, NgIf } from '@angular/common';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
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

import { AutoCompleteModule } from 'primeng/autocomplete';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormsModule } from '@angular/forms';
import { SearchInputProductsComponent } from "../../../../../../shared/components/search-input-products/search-input-products.component";
import { SpinnerS7Component } from "../../../../../../shared/components/spinners/spinner-s7/spinner-s7.component";
import { CustomCurrencyPipe } from "../../../../../../core/pipes/custom_currency/custom-currency.pipe";


// import{} from ;
@Component({
  selector: 'app-get-all-products',
  standalone: true,
  templateUrl: './get-all-products.component.html',
  styleUrls: ['./get-all-products.component.scss', "../../../../../../shared/styles/admin_table.scss"],
  imports: [FormsModule, FloatLabelModule, AutoCompleteModule, MatPaginatorModule, MatTableModule, MatIcon, CurrencyPipe, InputDangerTextComponent, MessagePopUpComponent, ProductsUpdatePopUpComponent, ConfirmPopUpComponent, SearchInputProductsComponent, SpinnerS7Component, CustomCurrencyPipe]
})
export class GetAllProductsComponent {

  _adminService: AdminService = inject(AdminService);
  products$!: BKProduct[];

  @ViewChild('searchInputComponent') private searchInputComponent!: SearchInputProductsComponent;


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


  // Spinner
  isLoading = false;

  ngAfterViewInit(): void {
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

  updateProductsState(text?: string) {
    const inputText = this.searchInputComponent.getInputText();
    if(inputText){
      this._adminService.getAllProductsForAdmin(this.currentPage + 1, this.pageSize, inputText).subscribe(productResponse => {
        this.products$ = productResponse.products;
        this.totalPages = productResponse.pagination.totalPages;
        this.totalItems = productResponse.pagination.totalElements;
      })
    }else{
      this._adminService.getAllProductsForAdmin(this.currentPage + 1, this.pageSize, text).subscribe(productResponse => {
        this.products$ = productResponse.products;
        this.totalPages = productResponse.pagination.totalPages;
        this.totalItems = productResponse.pagination.totalElements;
      })
    }
    
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


  search(value: string) {
    this.updateProductsState(value);
  }

  navigateTo(value: string) {
    window.open('/product-details/' + value, '_blank');
  }
}

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}


