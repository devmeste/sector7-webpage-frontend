import { Injectable } from '@angular/core';
import { BuildYourPcCartEntry } from 'app/core/models/BuildYourPcCartEntry';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BuildYourPcService {
 

  categories: Object = {
    'Linea' : 'linea',
    'Procesadores' : 'procesador',
    'Mothers' : 'mother',
    'Memorias' : 'memoria RAM',
    'Almacenamiento' : 'almacenamiento',
    'Fuentes' : 'fuente',
    'Placas de video' : 'placa de video',
    'Refrigeracion' : 'refrigeracion',
    'Monitores' : 'monitor',
    'Gabinetes' : 'gabinete',
    'Auriculares' : 'auriculares',
    'Teclados' : 'teclado',
    'Mouses' : 'mouse',
  }

  buildYourPcCart: BuildYourPcCartEntry[] = Object.entries(this.categories).map(([key, value]) => (
    { 
      'categoryName': key, 
      'selectedProductName': null, 
      'selectedProductQuantity': 0, 
      'titleWords': value
     }
  ))


  buildYourPcCart$ = new BehaviorSubject<BuildYourPcCartEntry[]>(this.buildYourPcCart);

 
  getBuildYourPcCart(): Observable<BuildYourPcCartEntry[]> {
    console.log("paso por aca");
    this.createLocalStorageCartIfNotExists();
    console.log(this.buildYourPcCart$.value);
    this.buildYourPcCart$.next(this.getCartFromStorage()); 
    console.log(this.buildYourPcCart$.value);
    return this.buildYourPcCart$;
  }

  updateBuildYourPcCart(newEntry: BuildYourPcCartEntry) {
    this.createLocalStorageCartIfNotExists();

    this.updateEntry(newEntry);
    // this.buildYourPcCart$.next(this.buildYourPcCart);
    localStorage.setItem('buildYourPcCart', JSON.stringify(this.buildYourPcCart));
  }


  getTitleWordBySection(section: string): string {
    const entrysIndex = this.buildYourPcCart.findIndex(entry => entry.categoryName === section);
    if(entrysIndex) {
      return this.buildYourPcCart[entrysIndex].titleWords;
    }
    return '';
  }

  getEntryBySection(section: string): BuildYourPcCartEntry | null {
    const entrysIndex = this.getCartFromStorage().findIndex(entry => entry.categoryName.toLowerCase() === section.toLowerCase());
    if(entrysIndex>=0) {
      return this.getCartFromStorage()[entrysIndex];
    }
    return null;
  }

  private getCartFromStorage(): BuildYourPcCartEntry[] {
    return JSON.parse(localStorage.getItem('buildYourPcCart')!);
  }



  
  // Auxiliary methods
  private createLocalStorageCartIfNotExists(): void {
    if(localStorage.getItem('buildYourPcCart')==null) {
      localStorage.setItem('buildYourPcCart', JSON.stringify(this.buildYourPcCart));
    }
  }

  private updateEntry(newEntry: BuildYourPcCartEntry): void {
    const existingEntry = this.searchEntry(newEntry.categoryName);
    if(existingEntry) {
      existingEntry.selectedProductName = newEntry.selectedProductName;
      existingEntry.selectedProductQuantity = newEntry.selectedProductQuantity;
    }
  }


  private searchEntry(category: string): BuildYourPcCartEntry | undefined {
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
