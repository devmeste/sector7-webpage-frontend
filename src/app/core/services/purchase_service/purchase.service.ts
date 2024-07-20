import { Injectable } from '@angular/core';
import { IMakePurchase } from 'app/core/models/IMakePurchase';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  shipment: IMakePurchase | null = null;


  constructor() {

  }


  hasShipment(): boolean {
    if (this.shipment) return true;
    return false;
  }

  setShipment(shipment: IMakePurchase) {
    this.shipment = shipment;
  }

  //   async function makePurchase(){
  //     let jsonResponse = { };

  //     await fetch("http://localhost:8001/api/v1/es/purchase/make", { 
  //         method: "POST",
  //         body: JSON.stringify(jsonResponse), 
  //         headers: {
  //             "Accept": "application/json",
  //             "Authorization": `Bearer ${token}`,
  //             "Content-type": "application/json"
  //         } 
  //     }).then(response => {
  //         if(response.ok){
  //             response.text().then(mpCode => {
  //                 console.log(mpCode);

  //                 createMpButton(mpCode);
  //             })
  //         }
  //     }).catch(error => console.log(error));
  // }

}
