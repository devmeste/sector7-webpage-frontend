import {  Component, ElementRef, ViewChild, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FooterComponent } from "../../../shared/components/footer/footer.component";
import { IProduct } from '../../../core/models/product';
import { ProductService } from '../../../core/services/product_service/product.service';
import { MatDividerModule } from '@angular/material/divider';
import IFeature from '../../../core/models/IFeature';
import { WideProductCardComponent } from "../../../shared/components/cards/wide-product-card/wide-product-card.component";
import { MatIcon } from '@angular/material/icon';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { BreadcrumbComponent } from "../../../shared/components/breadcrumb/breadcrumb.component";
import BKProduct from 'app/core/models/BKProduct';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SpinnerS7Component } from "../../../shared/components/spinners/spinner-s7/spinner-s7.component";
import { SpinnerS7SmallComponent } from "../../../shared/components/spinners/spinner-s7-small/spinner-s7-small.component";
import { AdminService } from 'app/core/services/admin_service/admin.service';
import { ICategory } from 'app/core/models/ICategory';
import { IFiltersForSearch } from 'app/core/models/filters/IFiltersForSearch';
import { InputDangerTextComponent } from "../../../shared/components/inputs/input-danger-text/input-danger-text.component";
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-search',
  standalone: true,
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  imports: [FooterComponent,
    MatDividerModule,
    WideProductCardComponent,
    MatIcon,
    FormsModule,
    NgClass,
    RouterLink, BreadcrumbComponent,
    InfiniteScrollModule, SpinnerS7Component, SpinnerS7SmallComponent, 
    InputDangerTextComponent,
    ReactiveFormsModule,
    DropdownModule
  ]
})




export class SearchComponent {


  @ViewChild('searchInput') searchInput!: ElementRef;

  private _activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private _router: Router = inject(Router);
  private _productService = inject(ProductService);
  private _adminService = inject(AdminService);
  
  products: BKProduct[] = [];

  // Infinite Scroll
  page: number = 1;
  totalPages : number = this.page+1;
  loading: boolean = false;


  formGroup!: FormGroup;
  private fb : FormBuilder = inject(FormBuilder);
  waysToOrder = [
    { name: "Mas relevante" },
    { name: "Menor precio" },
    { name: "Mayor precio" },
  ];

    // for filters
    brands: string[] = [];
    categories : ICategory[] = [];
    textToSearch = signal <string> ('');

    brandSelected = signal<string | null>(null);
    categorySelected = signal<string | null>(null);
    sincePrice = signal<number | null>(null);
    untilPrice = signal<number | null>(null);

    order = '' ;
    direction = '';
  

    filters : IFiltersForSearch ={
      price :{
        since: this.sincePrice(),
        until: this.untilPrice()
      },
      category : this.categorySelected(),
      brand : this.brandSelected(),
      text: this.textToSearch(),
      order : {
        name : null,
        direction : null
      }
    }



  // TODO: Mejorar esta logica
  ngOnInit(): void {
    this.formGroup = this.fb.group({
      order_by: [''] 
    })

          // Escucha cambios en el select de ordenación
  this.formGroup.get('order_by')?.valueChanges.subscribe(value => {
    const valueString = JSON.stringify(value);
    this.applyOrderFilter(valueString);
  });



    this._activatedRoute.params.subscribe(params => {
      if (params['textToSearch']){
        this.products = [];
        this.page = 1;
        this.textToSearch.set(params['textToSearch']);
        window.scrollTo(0, 0); 
        this.updateProductsInfo();
      }
      else{
        this.updateProductsInfo();
      }
      
     
    })

    this._productService.getAllBrands().subscribe(response => {
      this.brands = response.brands;
    })

    this._adminService.getAllCategories().subscribe(c => {
      this.categories = c;
    })


    window.scrollTo(0, 0); 
  }


  updateProductsInfo() {

    this.loading = true;

    this.filters.brand = this.brandSelected();
    this.filters.price.since = this.sincePrice();
    this.filters.price.until = this.untilPrice();
    this.filters.category = this.categorySelected();
    this.filters.text = this.textToSearch();
    this.filters.order = { name: this.order, direction: this.direction}; 

    console.log(this.order);
    console.log(this.direction);

    console.log(this.filters);
    this._productService
    .getAllProducts2(this.page, this.filters)
    .subscribe((productResponse) => {
      this.products = [...this.products, ...productResponse.products];
      this.totalPages = productResponse.pagination.totalPages;
      this.page = productResponse.pagination.currentPage;
      this.loading = false;
    });

    
  }
   
  


  // Métodos para manejar los cambios en los filtros
  applyPriceFilter() {
    // console.log(this.filters.price);
    this.filters.price.since = this.sincePrice();
    this.filters.price.until = this.untilPrice();
    this.page = 1; // Reiniciar la paginación al aplicar un nuevo filtro
    this.products = []; // Reiniciar productos al aplicar un nuevo filtro
    this.updateProductsInfo();
  }

  onScroll() {
    if (!this.loading && this.page <= this.totalPages) {
      this.page++;
      this.updateProductsInfo();
    }
  }



  clearFilters() {

    this.page=1;
    this.products = [];
    this.brandSelected.set(null);
    this.categorySelected.set(null);
    this.sincePrice.set(null);
    this.untilPrice.set(null);
    this.textToSearch.set('');
    this.updateProductsInfo();
    
  }


  setElementToFilter(type: string , name : string) {
    switch (type) {
      case "brand":
        if(this.brandSelected() == name) {
          this.page=1;
          this.products = [];
          this.brandSelected.set(null);
          this.updateProductsInfo();
          break;
  
        }else{
          this.page=1;
          this.products = [];
          this.brandSelected.set(name);
          this.updateProductsInfo();
          break;
        }
        
  
      case "category":
        if(this.categorySelected() == name) { 
          this.page=1;
          this.products = [];
          this.categorySelected.set(null);
          this.updateProductsInfo();
          break;
        }else{
          this.page=1;
          this.products = [];
          this.categorySelected.set(name);
          this.updateProductsInfo();
          break;
        }
  
    }
    
  
  }
  


  applyOrderFilter(value: string): void {
    console.log(value);
    console.log("---------------Boolean -------------------");
    console.log(value.includes('Menor precio'));

    if (value.includes('Menor precio')) {
      // this.filters.order = { name: 'price', direction: 'asc' };
      this.order = 'price'
      this.direction = 'asc';
    } else if (value.includes('Mayor precio')) {
      this.order = 'price'
      this.direction = 'desc';
    } else {
      // Si el valor es otro, resetea la ordenación
      this.order = '';
      this.direction = '';
    }
  
    // Reinicia los productos y la paginación cuando se aplica un nuevo filtro
    this.page = 1;
    this.products = [];
    this.updateProductsInfo();
  }



}





