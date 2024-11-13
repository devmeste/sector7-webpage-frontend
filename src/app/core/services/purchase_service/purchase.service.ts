import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Address, IMakePurchase, Product_QuantityRequested, } from 'app/core/models/IMakePurchase';
import { MercadoPagoJS } from 'assets/js/MercadoPagoJS.js';
import { CartService } from '../cart_service/cart-service.service';
import { map, Observable, of, switchMap, tap } from 'rxjs';
import { environment } from 'app/core/environments/environment';
import { IPurchase } from 'app/core/models/IPurchase';
import { StringMessageResponse } from 'app/core/models/StringMessageResponse';

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

  getAllPurchasesByUser() : Observable<IPurchase[]> {
    return this._httpClient.get<IPurchase[]>(this.baseUrl + "purchase/user");
  }

  getPurchaseById( id : string) : Observable <IPurchase> {
    return this._httpClient.get<IPurchase>(this.baseUrl +`purchase/${id}`);
  }



  makePurchaseInService( address : Address | null , paymentMethodNumber : number , products : Product_QuantityRequested): Observable<StringMessageResponse> {

        // 1 . mercado pago 
        // 2 . en el local
        let localPickUp = address === null ? true : false; 

        console.log("paymentMethodNumber: " + paymentMethodNumber);

        let jsonResponse = {
          "products": products,
          "address": address,
          "localPickUp": localPickUp,
          "paymentMethod": paymentMethodNumber
        };

        
        return this._httpClient.post<StringMessageResponse>(this.baseUrl + "purchase/make", jsonResponse);
      
  }


  changePaymentMethod(id: string, paymentMethod: number) : Observable <StringMessageResponse> {
    let body = {
      id,
      paymentMethod
    }
    return this._httpClient.put<StringMessageResponse>(this.baseUrl + `purchase/change-payment-method`, body);
  }

  
}

