import { CurrencyPipe, NgClass } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import BKProduct from 'app/core/models/BKProduct';
import { AdminService } from 'app/core/services/admin_service/admin.service';
import { ProductDetailsPopUpComponent } from "../product-details-pop-up/product-details-pop-up.component";
import { CustomCurrencyPipe } from "../../../../../core/pipes/custom_currency/custom-currency.pipe";
import { SearchInputProductsComponent } from "../../../../../shared/components/search-input-products/search-input-products.component";
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { GetAllGenericScroll } from '../get-all-products-generic-scroll';
@Component({
    selector: 'app-enable-products',
    standalone: true,
    templateUrl: './enable-products.component.html',
    styleUrls: ['./enable-products.component.scss', '../../../../../shared/styles/admin_table.scss'],
    imports: [NgClass, MatIcon, CurrencyPipe, ProductDetailsPopUpComponent, CustomCurrencyPipe, SearchInputProductsComponent, InfiniteScrollModule]
})
export class EnableProductsComponent extends GetAllGenericScroll {
  






  _adminService: AdminService = inject(AdminService);

  @ViewChild('searchInputComponent') private searchInputComponent!: SearchInputProductsComponent;
  @ViewChild('searchBySerialInputComponent') private searchBySerialInputComponent!: SearchInputProductsComponent;

  products$: BKProduct[] = [];

  getAllSearchPlaceholder:string = "Buscar por titulo";
  getBySerialPlaceholder:string = "Buscar por numero de serie";

      // Infinite Scroll
      page: number = 0;
      totalPages : number = this.page+1;
      loading: boolean = false;
  
      isOnScrollAllowed: boolean = true;

      updateProductsState(
          byTitle: boolean = true, 
          text: string = '', 
          isFirstSearch: boolean = false) {
    
        this.isOnScrollAllowed = true;
    
        if(byTitle){
          const inputText = this.searchInputComponent.getInputText();
          
          if(inputText){
    
            if(isFirstSearch){
              this.page = 0;
              this.products$= [];
            }
            console.log(this.page);
            
            this._adminService.getAllEnabledProducts(this.selectedOption ,this.page + 1,  inputText).subscribe(productResponse => {
              console.log(productResponse);
              
              this.totalPages = productResponse.pagination.totalPages;
          
              this.page = productResponse.pagination.currentPage;
        
              this.products$ = [...this.products$, ...productResponse.products];
              this.loading = false;

            })
          }else{
            console.log("No tiene texto");
            this._adminService.getAllEnabledProducts(this.selectedOption, this.page + 1, '').subscribe(productResponse => {
              // console.log("primera vez");
              console.log(productResponse);
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
        }
        else{
          console.log("entro? ");
          const inputTextIDCase = this.searchBySerialInputComponent.getInputText() || '';
          console.log("lo que quiero buscar:" + inputTextIDCase);
          this.page = 0;
          this.products$ = [];
          
          // este if es por si limpiaron el input, entonces, deberia llamar al get all products comun
          // y limpiar los productos.. (en el else, en el if trae el elemento por el ID)
          if(inputTextIDCase){
            this._adminService.getProductById(inputTextIDCase).subscribe(productResponse => {
              // if(productResponse){
                
              // }
              this.products$.push(productResponse);
              this.totalPages = 1;
              this.isOnScrollAllowed=false;
            });
          }else{
            this.updateProductsState(true, '', true);
          }
          
        }
      }
      
      onScroll() {
        console.log("hola");
        console.log(!this.loading);
        console.log("this.page : "+ this.page);
        console.log("this.totalPages: " +  this.totalPages);
        if (!this.loading && this.page <= this.totalPages && this.isOnScrollAllowed) {
          // this.page++;
          this.updateProductsState(true);
        }
      }

      search(value: string) {
        console.log("por titulo");
        this.updateProductsState(true, value , true);
      }
      
      searchBySerialNumber(value: string){
        console.log("por numero de serie")
        this.updateProductsState(false, value);
      }



































  

  // _adminService: AdminService = inject(AdminService);

  selectedOption: string = 'enabled';
  // products$: BKProduct[] = [];
  checkbox_default_value: boolean = false;

  id_to_show_pop_up: string = '';
  price_to_show_pop_up: number= 0;
  showPopup: boolean=false;


  ngOnInit(): void {
    this.changeProductsState(this.selectedOption);
  }

  changeProductsState(option: string) {
    
    this.chargeProducts(option);
    this.selectedOption = option;
    //this.checkbox_default_value = option === 'enabled' ? true : false;
  }

  chargeProducts(option: string , page : number = 0 , text: string = '') {

    this._adminService.getAllEnabledProducts(option).subscribe(productResponse => {
      this.products$ = productResponse.products;
    })
  }

  mostrar(id: string) {
    this.products$.filter(product => product.id == id)[0].isEnabled = !this.products$.filter(product => product.id == id)[0].isEnabled;

  }

  send() {
    let ids_to_send: string[] = [];
    for (let product of this.products$) {
      if (product.isEnabled) {
        ids_to_send.push(product.id);
      }
    }


    this._adminService.sendUpdateEnableProducts(ids_to_send, this.selectedOption).subscribe({
      next:()=>{
        this.changeProductsState(this.selectedOption);
      },
      error:(error)=>{}
    });
  }


  showProductPopup(id: string, price: number) {
    this.showPopup = true;
    this.id_to_show_pop_up = id;
    this.price_to_show_pop_up = price;
  }

  closeModal(option: string) {
    switch (option) {
      case "showPopup": this.showPopup = false;
        break;
    }
  }

  // Método que invoca al método de limpieza del hijo
  clearSearchInputs() {
    this.searchInputComponent.clearInput();
    this.searchBySerialInputComponent.clearInput();
    this.products$ = [];
    this.page = 0;
    this.updateProductsState(true, '', true);
  }

}
