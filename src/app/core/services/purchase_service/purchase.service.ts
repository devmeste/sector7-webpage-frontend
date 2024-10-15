import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Address, IMakePurchase, Product_QuantityRequested, } from 'app/core/models/IMakePurchase';
import { MercadoPagoJS } from 'assets/js/MercadoPagoJS.js';
import { CartService } from '../cart_service/cart-service.service';
import { map, Observable, of, switchMap, tap } from 'rxjs';
import { environment } from 'app/core/environments/environment';

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



  makePurchaseInService( address : Address | null , paymentMethodNumber : number , products : Product_QuantityRequested): Observable<any> {

        // 1 . mercado pago 
        // 2 . en el local
        let localPickUp = address === null ? true : false; 

        let jsonResponse = {
          "products": products,
          "address": address,
          "localPickUp": localPickUp,
          "paymentMethod": paymentMethodNumber
        };

        let body = JSON.stringify(jsonResponse);

        const headers = new HttpHeaders({
          "Accept": "application/json",
          'Content-Type': 'application/json',
        });

        console.log("Se ejecuto el servicio de Purchase");
        
        return this._httpClient.post(this.baseUrl + "purchase/make", body,  { headers, responseType: 'text' });
      
  }

  // return this._CartService.getAllProducts().pipe(
  //   map(products => {
  //     console.log("service: primer control");
  //     console.log(products);

  //     let jsonProducts: { [key: string]: number } = {};
  //     products.forEach(element => {
  //       jsonProducts[element.productId] = element.quantity;
  //     });

  //     let localPickUp = address === null;
  //     let jsonResponse = {
  //       "products": jsonProducts,
  //       "address": address,
  //       "localPickUp": localPickUp,
  //       "paymentMethod": paymentMethodNumber
  //     };

  //     console.log(jsonResponse);
  //     let body = JSON.stringify(jsonResponse);

  //     const headers = new HttpHeaders({
  //       "Accept": "application/json",
  //       'Content-Type': 'application/json',
  //     });

  //     // Retorna la llamada HTTP como observable
  //     return this._httpClient.post(this.baseUrl + "purchase/make", body, { headers, responseType: 'text' });
  //   }),
  //   switchMap(httpResponse => {
  //     // Procesa la respuesta HTTP si es necesario
  //     console.log(httpResponse);
  //     return of(httpResponse);  // Retorna la respuesta envuelta en un observable
  //   })
  // );
  
}

