import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'app/core/environments/environment';
import { BuildYourPcCartEntry } from 'app/core/models/BuildYourPcCartEntry';
import { IProduct } from 'app/core/models/product';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BuildYourPcService {

  _http : HttpClient = inject(HttpClient); 
  private baseUrl: string = environment.apiUrl;

  categories: Object = {
    'Linea': 'linea',
    'Procesadores': 'procesador',
    'Mothers': 'mother',
    'Memorias': 'memoria RAM',
    'Almacenamiento': 'almacenamiento',
    'Fuentes': 'fuente',
    'Placas de video': 'placa de video',
    'Refrigeracion': 'refrigeracion',
    'Monitores': 'monitor',
    'Gabinetes': 'gabinete',
    'Auriculares': 'auriculares',
    'Teclados': 'teclado',
    'Mouses': 'mouse',
  }

  buildYourPcCart!: BuildYourPcCartEntry[];
  buildYourPcCart$ = new BehaviorSubject<BuildYourPcCartEntry[]>(this.buildYourPcCart);
  cartTotal$: BehaviorSubject<number> = new BehaviorSubject<number>(0);


  constructor() {
    if (!localStorage.getItem('buildYourPcCart')) {
      this.setAllEntrysByDefault();
    }
    else {
      this.buildYourPcCart = JSON.parse(localStorage.getItem('buildYourPcCart')!);
      this.buildYourPcCart$.next(this.buildYourPcCart);
      this.cartTotal$.next(this.getCartTotal());
    }

  }
  setAllEntrysByDefault() {
    this.buildYourPcCart = Object.entries(this.categories).map(([key, value]) => (
      {
        'categoryName': key,
        'selectedProductID': null,
        'selectedProductName': null,
        'selectedProductQuantity': 0,
        'selectedProductPrice': 0,
        'selectedProductPhoto': '',
        'titleWords': value
      }
    ));

    localStorage.setItem('buildYourPcCart', JSON.stringify(this.buildYourPcCart));
    this.buildYourPcCart$.next(this.buildYourPcCart);
    this.cartTotal$.next(0);
  }

  getBuildYourPcCart(): Observable<BuildYourPcCartEntry[]> {
    this.createLocalStorageCartIfNotExists();
    this.buildYourPcCart$.next(this.getCartFromStorage());
    return this.buildYourPcCart$;
  }

  updateBuildYourPcCart(newEntry: BuildYourPcCartEntry) {
    this.createLocalStorageCartIfNotExists();

    this.updateEntry(newEntry);
    this.buildYourPcCart$.next(this.buildYourPcCart);
    localStorage.setItem('buildYourPcCart', JSON.stringify(this.buildYourPcCart));
  }

  getTitleWordBySection(section: string): string {
    const entrysIndex = this.buildYourPcCart.findIndex(entry => entry.categoryName.toLowerCase() === section.toLowerCase());
    if (entrysIndex != -1) {
      return this.buildYourPcCart[entrysIndex].titleWords || '';
    }
    return '';
  }

  getEntryBySection(section: string): BuildYourPcCartEntry | null {
    const entrysIndex = this.getCartFromStorage().findIndex(entry => entry.categoryName.toLowerCase() === section.toLowerCase());
    if (entrysIndex >= 0) {
      return this.getCartFromStorage()[entrysIndex];
    }
    return null;
  }


  addToCart(newEntry: BuildYourPcCartEntry) {

    this.updateBuildYourPcCart(newEntry);

    this.buildYourPcCart$.next(this.getCartFromStorage());
  }

  deleteProduct(section: string) {
    const entry = this.getEntryBySection(section);

    if (entry) {
      entry.selectedProductName = null;
      entry.selectedProductQuantity = 0;
      entry.selectedProductID = null;
      entry.selectedProductPrice = 0;
      entry.selectedProductPhoto = '';
      this.updateBuildYourPcCart(entry);
    }

  }

  clearCart() {
    this.setAllEntrysByDefault();
  }


  removeEntryBySection(section: string) {
    const entrysIndex = this.getCartFromStorage().findIndex(entry => entry.categoryName.toLowerCase() === section.toLowerCase());

    const categoryName = this.capitalizeFirstLetter(section);
    const titleWord = this.getTitleWordBySection(section);

    const emptyEntry: BuildYourPcCartEntry = {
      categoryName: categoryName,
      selectedProductID: null,
      selectedProductName: null,
      selectedProductQuantity: 0,
      titleWords: titleWord,
      selectedProductPrice: 0,
      selectedProductPhoto: ''
    }

    if (entrysIndex >= 0) {
      this.buildYourPcCart[entrysIndex] = emptyEntry;
      localStorage.setItem('buildYourPcCart', JSON.stringify(this.buildYourPcCart));
      this.buildYourPcCart$.next(this.getCartFromStorage());
      this.cartTotal$.next(this.getCartTotal());
    }
  }


















  // Auxiliary methods
  private createLocalStorageCartIfNotExists(): void {
    if (localStorage.getItem('buildYourPcCart') == null) {
      localStorage.setItem('buildYourPcCart', JSON.stringify(this.buildYourPcCart));
    }
  }

  private updateEntry(newEntry: BuildYourPcCartEntry): void {
    // entrada existente
    const existingEntry = this.searchEntry(newEntry.categoryName);
    if (existingEntry) {
      existingEntry.selectedProductName = newEntry.selectedProductName;
      existingEntry.selectedProductQuantity = newEntry.selectedProductQuantity;
      existingEntry.selectedProductID = newEntry.selectedProductID;
      existingEntry.selectedProductPrice = newEntry.selectedProductPrice;
      existingEntry.selectedProductPhoto = newEntry.selectedProductPhoto;
      this.cartTotal$.next(this.getCartTotal());
    }
  }


  getCartTotal(): number {
    return this.buildYourPcCart.reduce((total, entry) => total + entry.selectedProductQuantity * entry.selectedProductPrice, 0);
  }

  private searchEntry(category: string): BuildYourPcCartEntry | undefined {
    return this.buildYourPcCart.find(entry => entry.categoryName.toLowerCase() === category.toLowerCase());
  }

  private getCartFromStorage(): BuildYourPcCartEntry[] {
    return JSON.parse(localStorage.getItem('buildYourPcCart')!);
  }


  private capitalizeFirstLetter(str: string) {
    if (!str) return ''; // Manejo de cadenas vacías
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

// servicio-armado-pc
// servicio-instalacion-pc

  getInstalledPrice() : Observable<IProduct> {
    //  products/service/servicio-armado-pc
      return this._http.get<IProduct>(this.baseUrl  + 'products/service/servicio-instalacion-pc');
      // return this._http.get<IProduct>(this.baseUrl  + 'products/serial-id-00012');
  }
  
  getAssembledPrice() {
    return this._http.get<IProduct>(this.baseUrl + 'products/service/servicio-armado-pc');
    // return this._http.get<IProduct>(this.baseUrl + 'products/serial-id-00012');
  }

}













