import { Component, ElementRef, EventEmitter, inject, Output, ViewChild } from '@angular/core';
import { AutoComplete, AutoCompleteCompleteEvent, AutoCompleteSelectEvent } from 'primeng/autocomplete';
import { debounceTime, distinctUntilChanged, Subject, switchMap, takeUntil } from 'rxjs';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormsModule } from '@angular/forms';
import { ProductService } from 'app/core/services/product_service/product.service';
import BKProduct from 'app/core/models/BKProduct';


@Component({
  selector: 'app-search-input-products',
  standalone: true,
  imports: [AutoCompleteModule, FloatLabelModule, FormsModule],
  templateUrl: './search-input-products.component.html',
  styleUrl: './search-input-products.component.scss'
})
export class SearchInputProductsComponent {
  

  @Output() searchString = new EventEmitter<string>();

  //  Search Bar 
  items: BKProduct[] | undefined;

  inputText: string | undefined;

  suggestions!: string[];

  _productService: ProductService = inject(ProductService);

  private searchSubject = new Subject<string>();
  // private cancelSearchSubject = new Subject<void>();

  @ViewChild('autoComplete') autoComplete!: ElementRef;


  search(event: AutoCompleteCompleteEvent) {
    this.searchSubject.next(event.query);
  }

  ngOnInit(): void {
    // search bar
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(query => this._productService.search(query)),
    ).subscribe(productResponse => {
      this.suggestions = productResponse.products.map(product => product.title);
    });
  }

  send(event?: AutoCompleteSelectEvent) {
    if(event){
      this.searchString.emit(event.value); 
      // this.searchString.emit(this.inputText); 
    }
    this.searchString.emit(this.inputText);
  }

  sendByEnter(autoCompleteComp: AutoComplete) {
    this.searchString.emit(this.inputText);
    autoCompleteComp.hide(true); // Cierra el popup al presionar Enter
    this.removeFocus();
    // this.cancelSearchSubject.next(); // Cancelar cualquier búsqueda en curso
  }

  removeFocus() {
    this.autoComplete.nativeElement.blur();
  }
}