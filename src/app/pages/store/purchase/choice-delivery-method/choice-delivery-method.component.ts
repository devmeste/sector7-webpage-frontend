import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { IProduct_Cart } from 'app/core/models/product_cart';
import { CartService } from 'app/core/services/cart_service/cart-service.service';
import { PurchaseService } from 'app/core/services/purchase_service/purchase.service';
import { ChargeJsScriptsService } from 'app/charge-js-scripts.service';

import { MiClase } from 'assets/js/mp';

@Component({
  selector: 'app-choice-delivery-method',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './choice-delivery-method.component.html',
  styleUrl: './choice-delivery-method.component.scss'
})
export class ChoiceDeliveryMethodComponent {
  shipping: any;

  _PurchaseService = inject(PurchaseService);
  _cartService = inject(CartService);
  _chargeJsScriptsService = inject(ChargeJsScriptsService);
  miClase !:MiClase ;
  products$ !: IProduct_Cart[];
  cartQuantity$ !: number;
  total$ !: number;

  constructor() {
    this.miClase = new MiClase();
    let mp = this.miClase.metodo();
    let mpCode = "algo";
    mp. mp.bricks().create("wallet", "wallet-container", {
      initialization: {
          preferenceId: mpCode
      }
  })
  }

  ngOnInit(): void {
    this._cartService.getAllProducts().subscribe(products => {
      this.products$ = products
    })
    this._cartService.getCartQuantity().subscribe(quantity => {
      this.cartQuantity$ = quantity;
    })
    this._cartService.getCartTotal().subscribe(total => {
      this.total$ = total;
    })

    this._chargeJsScriptsService.charge(['mp']);
    
    

    
    // console.log("Cargo el Purchase Service");
    // this.promise = new Promise((resolve) => {
    //   resolve(this.loadScripts());
    // }).then(() => {
    //   setTimeout(() => {
    //     // configuraciones aquí
    //     console.log('Loaded scripts.');
    //     console.log(this.promise);
    //   }, 2000);
    // });

  }



  



  // mp : any;
   
  // promise?: Promise<any>;
  // url = 'https://sdk.mercadopago.com/js/v2';

  // loadScripts() {
  //   let node = document.createElement('script');
  //   node.src = this.url;
  //   node.type = 'text/javascript';
  //   node.async = true;
  //   node.charset = 'utf-8';
  //   document.getElementsByTagName('head')[0].appendChild(node);
  //   return true;
  // }

}
