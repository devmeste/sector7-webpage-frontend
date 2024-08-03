import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Address, IMakePurchase, Product_QuantityRequested, } from 'app/core/models/IMakePurchase';
import { MercadoPagoJS } from 'assets/js/MercadoPagoJS.js';
import { CartService } from '../cart_service/cart-service.service';
import { map, Observable, switchMap, tap } from 'rxjs';
import { environment } from 'app/core/enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  shipment: IMakePurchase | null = null;
  mercadoPago !: MercadoPagoJS;
  private baseUrl: string = environment.apiUrl;
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



  makePurchase( address : Address | null): Observable<any> {
    return this._CartService.getAllProducts().pipe(
      
      switchMap(products => {
        
        let jsonProducts: { [key: string]: number } = {};

        products.forEach(element => {
          jsonProducts[element.id] = element.quantityRequested;
        });

        let localPickUp = address === null ? true : false; 

        let jsonResponse = {
          "products": jsonProducts,
          "address": address,
          "localPickUp": localPickUp 
        };

        let body = JSON.stringify(jsonResponse);

        const headers = new HttpHeaders({
          "Accept": "application/json",
          'Content-Type': 'application/json',
        });

        return this._httpClient.post(this.baseUrl + "purchase/make", body,  { headers, responseType: 'text' });
      })
    );
  }
}
