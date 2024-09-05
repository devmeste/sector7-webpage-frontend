import { Component, ElementRef, EventEmitter, inject, Output, signal, Signal, ViewChild } from '@angular/core';
import { AutoComplete, AutoCompleteCompleteEvent, AutoCompleteSelectEvent, AutoCompleteUnselectEvent } from 'primeng/autocomplete';
import { debounceTime, distinctUntilChanged, Subject, switchMap, takeUntil } from 'rxjs';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormsModule } from '@angular/forms';
import { ProductService } from 'app/core/services/product_service/product.service';
import BKProduct from 'app/core/models/BKProduct';
import { NgClass } from '@angular/common';


@Component({
  selector: 'app-search-input-products',
  standalone: true,
  imports: [AutoCompleteModule, FloatLabelModule, FormsModule, NgClass],
  templateUrl: './search-input-products.component.html',
  styleUrl: './search-input-products.component.scss'
})
export class SearchInputProductsComponent {



  @Output() searchString = new EventEmitter<string>();


  isDropdownHidden = signal<boolean>(false);
  //  Search Bar 
  items: BKProduct[] | undefined;

  inputText: string | undefined;

  suggestions!: string[];

  _productService: ProductService = inject(ProductService);

  private searchSubject = new Subject<string>();
  inputHasFocus: boolean = false;

  search(event: AutoCompleteCompleteEvent) {
    console.log("InputText en search: " + this.inputText);
    this.searchSubject.next(event.query);
  }

  ngOnInit(): void {
    this.searchSubject.pipe(
      switchMap(query => this._productService.search(query)),
    ).subscribe(productResponse => {
      this.suggestions = productResponse.products.map(product => product.title);
    });
  }


    // Método para obtener el texto actual
    getInputText(): string | undefined {
      return this.inputText;
    }
  
  send(event?: AutoCompleteSelectEvent) {
    this.isDropdownHidden.set(false);
    this.searchString.emit(this.inputText);
  }

  onClear() {
    this.searchString.emit(this.inputText);
  }

  onKeyUp(event: KeyboardEvent) {
    if (event.key === "Enter") {
      this.isDropdownHidden.set(true);
      this.searchString.emit(this.inputText);
    }
    else {
      this.isDropdownHidden.set(false);
    }
  }


  onFocus() {
    this.inputHasFocus = true;
  }

  onBlur() {
    this.inputHasFocus = false;
  }



}