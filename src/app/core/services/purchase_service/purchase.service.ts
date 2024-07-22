import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IMakePurchase, Product_QuantityRequested, } from 'app/core/models/IMakePurchase';
import { MercadoPagoJS } from 'assets/js/mp';
import { CartService } from '../cart_service/cart-service.service';
import { map, Observable, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  shipment: IMakePurchase | null = null;
  mercadoPago !: MercadoPagoJS;
  BASE_URL = "http://localhost:8001/api/v1/es/";
  _httpClient: HttpClient = inject(HttpClient);
  _CartService: CartService = inject(CartService);

  constructor() {
    if (this.mercadoPago == null) {
      this.mercadoPago = new MercadoPagoJS();
    }
  }



  hasShipment(): boolean {
    if (this.shipment) return true;
    return false;
  }

  setShipment(shipment: IMakePurchase) {
    this.shipment = shipment;
  }



  makePurchase(): Observable<any> {
    return this._CartService.getAllProducts().pipe(
      
      switchMap(products => {

        let jsonProducts: { [key: string]: number } = {};

        products.forEach(element => {
          jsonProducts[element.id] = element.quantityRequested;
        });

        let jsonResponse = {
          "products": jsonProducts,
          "address": {
            "zipCode": 7000,
            "province": "Buenos Aires",
            "city": "Tandil",
            "streetName": "San martin",
            "streetNumber": "366",
            "floor": "5",
            "door": "A"
          },
          "localPickUp": false
        };

        let body = JSON.stringify(jsonResponse);

        const headers = new HttpHeaders({
          "Accept": "application/json",
          'Content-Type': 'application/json',
        });

        return this._httpClient.post(this.BASE_URL + "purchase/make", body,  { headers, responseType: 'text' });
      })
    );
  }
}

  // makePurchase(): Observable<any> {

  //   let jsonProducts: Product_QuantityRequested[] = [];

  //   this._CartService.getAllProducts().subscribe(products => {
  //     jsonProducts = products.map(element => ({
  //       [element.id]: element.quantityRequested
  //     })
  //     )}
  //   )

  //   let jsonResponse = {
  //     "products": jsonProducts,
  //     "address": {
  //       "zipCode": 7000,
  //       "province": "Buenos Aires",
  //       "city": "Tandil",
  //       "streetName": "San martin",
  //       "streetNumber": "366",
  //       "floor": "5",
  //       "door": "A"
  //     },
  //     "localPickUp": false
  //   };

  //   let body = JSON.stringify(jsonResponse);

  //   console.log(jsonProducts);

  //   const headers = new HttpHeaders({
  //     "Accept": "application/json",
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${localStorage.getItem('token')}`
  //   });

  //   return this._httpClient.post(this.BASE_URL + "purchase/make", body, { headers }).pipe(
  //     tap((response: any) => {
  //       console.log(response);
  //       // return response;
  //     })
  //   );



  // }


// }