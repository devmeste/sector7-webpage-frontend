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
import { InfiniteScrollModule } from 'ngx-infinite-scroll';


// import{} from ;
@Component({
  selector: 'app-get-all-products',
  standalone: true,
  templateUrl: './get-all-products.component.html',
  styleUrls: ['./get-all-products.component.scss', "../../../../../../shared/styles/admin_table.scss"],
  imports: [FormsModule, FloatLabelModule, 
    AutoCompleteModule, MatPaginatorModule, 
    MatTableModule, MatIcon, CurrencyPipe, 
    InputDangerTextComponent, MessagePopUpComponent, 
    ProductsUpdatePopUpComponent, ConfirmPopUpComponent, 
    SearchInputProductsComponent, SpinnerS7Component, 
    CustomCurrencyPipe, InfiniteScrollModule]
})
export class GetAllProductsComponent {

  _adminService: AdminService = inject(AdminService);
  products$: BKProduct[] = [];
  getAllSearchPlaceholder:string = "Buscar por titulo";
  getBySerialPlaceholder:string = "Buscar por numero de serie";

  @ViewChild('searchInputComponent') private searchInputComponent!: SearchInputProductsComponent;
  @ViewChild('searchBySerialInputComponent') private searchBySerialInputComponent!: SearchInputProductsComponent;


  // MODAL POP-UPS 
  productDeletedSuccessfully = false;
  productDeletionFailed: boolean = false;
  errorMessage: any;
  showUpdatePopUp = false;
  update_id = '';
  product_USD_price!: number;

  // PAGINATOR
  // pageSizeOptions: number[] | readonly number[] = [5, 10, 25, 50];
  // totalItems = 0;
  // pageSize = 10;
  // currentPage = 0;
  // totalPages = 0;

  // Confirm Delete 
  userConfirmDelete = false;
  showPopUpToConfirmDelete = false;
  productIdToDelete = "";


  // Spinner
  isLoading = false;

  ngAfterViewInit(): void {
    this.updateProductsState(true);
  }

  deleteProduct(id: string) {
    this._adminService.deleteProduct(id).subscribe({
      next: (success) => {
        this.productDeletedSuccessfully = success
        this.updateProductsState(true);
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

  updateProductsState(
      byTitle: boolean = true, 
      text: string = '', 
      isFirstSearch: boolean = false) {

    this.isOnScrollAllowed = true;
    console.log(`Aca: ${byTitle}, ${text}`);

    if(byTitle){
      const inputText = this.searchInputComponent.getInputText();

      
      if(inputText){

        if(isFirstSearch){
          this.page = 0;
          this.products$= [];
        }
        console.log("lo que quiero buscar:" + inputText );
        // this.page = 0;
        console.log("esto es el page antes de entrar:" + this.page );
        // this.products$= [];

        this._adminService.getAllProductsForAdmin(this.page + 1,  inputText).subscribe(productResponse => {
          console.log(productResponse);
          
          this.totalPages = productResponse.pagination.totalPages;
      
          this.page = productResponse.pagination.currentPage;
    
          this.products$ = [...this.products$, ...productResponse.products];
          this.loading = false;
        
        
          // this.products$ = productResponse.products;
          // this.totalPages = productResponse.pagination.totalPages;
          // this.totalItems = productResponse.pagination.totalElements;
        })
      }else{
        console.log("No tiene texto" );
        this._adminService.getAllProductsForAdmin(this.page + 1,  text).subscribe(productResponse => {
          console.log("primera vez");
          this.totalPages = productResponse.pagination.totalPages;
          console.log("Total de paginas:" + this.totalPages);
          this.page = productResponse.pagination.currentPage;

          console.log("esto es el page:" + this.page );
    
          this.products$ = [...this.products$, ...productResponse.products];
          // console.log("Array de productos: " + JSON.stringify(this.products$));
          this.loading = false;
          console.log("Array de productos length : " + this.products$.length);
        })
      }
    } else{
      const inputTextIDCase = this.searchBySerialInputComponent.getInputText() || '';
      console.log("lo que quiero buscar:" + inputTextIDCase);
      this.page = 0;
      this.products$ = [];
      
      // este if es por si limpiaron el input, entonces, deberia llamar al get all products comun
      // y limpiar los productos.. (en el else, en el if trae el elemento por el ID)
      if(inputTextIDCase){
        this._adminService.getProductById(inputTextIDCase).subscribe(productResponse => {
          this.products$.push(productResponse);
          this.totalPages = 1;
          this.isOnScrollAllowed=false;
        });
      }else{
        this.updateProductsState(true, '', true);
      }
      
    }
  }



  askToConfirmDelete(id: string) {
    this.showPopUpToConfirmDelete = true;
    this.productIdToDelete = id;
  }

  confirmDeleteAction() {
    this.deleteProduct(this.productIdToDelete);
    this.updateProductsState(true);
    this.closeModal("showPopUpToConfirmDelete");
  }


  search(value: string) {
    console.log("por titulo");
    this.updateProductsState(true, value , true);
  }

  searchBySerialNumber(value: string){
    console.log("por numero de serie")
    this.updateProductsState(false, value);
  }

  navigateTo(value: string) {
    window.open('/product-details/' + value, '_blank');
  }



    // Infinite Scroll
    page: number = 0;
    totalPages : number = this.page+1;
    loading: boolean = false;

    isOnScrollAllowed: boolean = true;


    onScroll() {
      console.log(!this.loading);
      console.log(this.page);
      console.log(this.totalPages);
      if (!this.loading && this.page <= this.totalPages && this.isOnScrollAllowed) {
        // this.page++;
        console.log("Page ++ en onScroll(): " + this.page);
        this.updateProductsState(true);
      }
    }
}

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}


