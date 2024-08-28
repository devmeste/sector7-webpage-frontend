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
    this.createLocalStorageCartIfNotExists();
    console.log("Paso por aca");
    this.buildYourPcCart$.next(this.getCartFromStorage()); 
    return this.buildYourPcCart$;
  }

  updateBuildYourPcCart(newEntry: BuildYourPcCartEntry) {
    this.createLocalStorageCartIfNotExists();

    this.updateEntry(newEntry);
    // this.buildYourPcCart$.next(this.buildYourPcCart);
    localStorage.setItem('buildYourPcCart', JSON.stringify(this.buildYourPcCart));
  }


  getTitleWordBySection(section: string): string {
    const entrysIndex = this.buildYourPcCart.findIndex(entry => entry.categoryName.toLowerCase() === section.toLowerCase());
    if(entrysIndex != -1) {
      return this.buildYourPcCart[entrysIndex].titleWords || '';
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


  addToCart(newEntry: BuildYourPcCartEntry) {
    // console.log(localStorage.getItem('buildYourPcCart'));
    this.updateBuildYourPcCart(newEntry);
    this.buildYourPcCart$.next(this.getCartFromStorage());
    // console.log(localStorage.getItem('buildYourPcCart'));
  }


  


  // Auxiliary methods
  private createLocalStorageCartIfNotExists(): void {
    if(localStorage.getItem('buildYourPcCart')==null) {
      localStorage.setItem('buildYourPcCart', JSON.stringify(this.buildYourPcCart));
    }
  }

  private updateEntry(newEntry: BuildYourPcCartEntry): void {
    // entrada existente
    const existingEntry = this.searchEntry(newEntry.categoryName);
    if(existingEntry){
      existingEntry.selectedProductName = newEntry.selectedProductName;
      existingEntry.selectedProductQuantity = newEntry.selectedProductQuantity;
    }
  }


  private searchEntry(category: string): BuildYourPcCartEntry | undefined {
    return this.buildYourPcCart.find(entry => entry.categoryName.toLowerCase() === category.toLowerCase());
  }

  private getCartFromStorage(): BuildYourPcCartEntry[] {
    console.log(JSON.parse(localStorage.getItem('buildYourPcCart')!));
    return JSON.parse(localStorage.getItem('buildYourPcCart')!);
  }

}













