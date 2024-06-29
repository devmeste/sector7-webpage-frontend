import { CurrencyPipe, NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import BKProduct from 'app/core/models/BKProduct';
import { AdminService } from 'app/core/services/admin_service/admin.service';
@Component({
  selector: 'app-enable-products',
  standalone: true,
  imports: [NgClass, MatIcon, CurrencyPipe],
  templateUrl: './enable-products.component.html',
  styleUrls: ['./enable-products.component.scss', '../../../../../shared/styles/admin_table.scss']
})
export class EnableProductsComponent {


  showProductPopup(arg0: string, arg1: number) {
    throw new Error('Method not implemented.');
  }

  _adminService: AdminService = inject(AdminService);

  selectedOption: string = 'enabled';
  products$: BKProduct[] = [];
  checkbox_default_value: boolean = true;

  ngOnInit(): void {
    this.changeProductsState(this.selectedOption);
  }

  changeProductsState(option: string) {
    this.chargeProducts(option);
    this.selectedOption = option;
    this.checkbox_default_value = option === 'enabled' ? true : false;
  }

  chargeProducts(option: string) {
    this._adminService.getAllEnabledProducts(option).subscribe(productResponse => {
      this.products$ = productResponse.products;
      console.log(productResponse.products);
    })
  }

  mostrar(id: string) {
    // console.log('----------------------');
    // console.log(id);
    // console.log('----------------------');
    this.products$.filter(product => product.id == id)[0].isEnabled = !this.products$.filter(product => product.id == id)[0].isEnabled;

    for (let product of this.products$) {
      console.log(product.id + ": " + product.isEnabled);
    }
  }

  send() {
    let ids_to_send: string[] = [];
    if (this.selectedOption === 'enabled') {
      for (let product of this.products$) {
        if (!product.isEnabled) {
          ids_to_send.push(product.id);
        }
      }
    }
    else{
      for (let product of this.products$) {
        if (product.isEnabled) {
          ids_to_send.push(product.id);
        }
      }
    }

    this._adminService.sendUpdateEnableProducts(ids_to_send, this.selectedOption).subscribe({
      next:()=>{
        console.log('EXITO');
        this.changeProductsState(this.selectedOption);
      },
      error:(error)=>{}
    });
  }

}
