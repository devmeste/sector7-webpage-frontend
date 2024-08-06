import { Injectable } from '@angular/core';
import { BuildYourPcCartEntry } from 'app/core/models/BuildYourPcCartEntry';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BuildYourPcService {

  categories: string[] = [
    'Procesador',
    'Motherboard',
    'Memoria RAM',
    'Almacenamiento',
    'Fuente De Poder',
    'Tarjeta De Video',
    'Sistema De Enfriamiento',
    'Monitor',
    'Audifonos',
    'Teclado',
    'Mouse'
  ]

  buildYourPcCart: BuildYourPcCartEntry[] = this.categories.map(category => ({
    categoryName: category,
    selectedProductName: null,
    selectedProductQuantity: 0
  }));


  buildYourPcCart$ = new BehaviorSubject<BuildYourPcCartEntry[]>(this.buildYourPcCart);

  constructor() {
    const processorProduct = this.searchEntry('Procesador');
    if (processorProduct) {
      processorProduct.selectedProductName = 'Procesador gamer Intel Core i9-13900K (9a. generación)';
      processorProduct.selectedProductQuantity = 1;
    }
  }

 
  getBuildYourPcCart(): Observable<BuildYourPcCartEntry[]> {
    return this.buildYourPcCart$;
  }

  updateBuildYourPcCart(newEntry: BuildYourPcCartEntry) {
    const existingEntry = this.searchEntry(newEntry.categoryName);
    if(existingEntry) {
      existingEntry.selectedProductName = newEntry.selectedProductName;
      existingEntry.selectedProductQuantity = newEntry.selectedProductQuantity;
    }
    this.buildYourPcCart$.next(this.buildYourPcCart);
  }

  private searchEntry( category: string): BuildYourPcCartEntry | undefined {
    return this.buildYourPcCart.find(entry => entry.categoryName === category);
  }

}



























//   constructor() { }

//   buildYourPcCart: BuildYourPcCart = {
//     processor: 'Procesador gamer Intel Core i9-13900K (9a. generación)',
//     motherboard: 'Motherboard Asus Prime A320m-k Am4 Ddr4 ATX ',
//     memory_ram: ' Hyper X ddr4 3200 mhz 16 Gb',
//     storage_device: 'Disco sólido interno Crucial CT240BX500SSD1 240GB negro',
//     power_supply: 'XCORE Power XCP630-TS  3200 mhz 16 Gb 80+ gold',
//     video_card: null,
//     cooling_system: null,
//     monitor:null,
//     headset:  null,
//     keyboard: null,
//     mouse: null,
//   };

//   getBuildYourPcCart() {
//     return this.buildYourPcCart;
//   }

// }

// interface BuildYourPcCart {
//   processor: string | null;
//   motherboard: string | null;
//   memory_ram: string | null;
//   storage_device: string | null;
//   power_supply: string | null;
//   video_card: string | null;
//   cooling_system: string | null;
//   monitor: string | null;
//   headset: string | null;
//   keyboard: string | null;
//   mouse: string | null;
// }
