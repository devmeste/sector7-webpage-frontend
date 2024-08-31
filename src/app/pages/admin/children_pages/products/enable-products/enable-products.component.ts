import { CurrencyPipe, NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import BKProduct from 'app/core/models/BKProduct';
import { AdminService } from 'app/core/services/admin_service/admin.service';
import { ProductDetailsPopUpComponent } from "../product-details-pop-up/product-details-pop-up.component";
import { CustomCurrencyPipe } from "../../../../../core/pipes/custom_currency/custom-currency.pipe";
@Component({
    selector: 'app-enable-products',
    standalone: true,
    templateUrl: './enable-products.component.html',
    styleUrls: ['./enable-products.component.scss', '../../../../../shared/styles/admin_table.scss'],
    imports: [NgClass, MatIcon, CurrencyPipe, ProductDetailsPopUpComponent, CustomCurrencyPipe]
})
export class EnableProductsComponent {


  

  _adminService: AdminService = inject(AdminService);

  selectedOption: string = 'enabled';
  products$: BKProduct[] = [];
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

  chargeProducts(option: string) {
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

}
