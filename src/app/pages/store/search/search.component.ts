import {  Component, ElementRef, ViewChild, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FooterComponent } from "../../../shared/components/footer/footer.component";
import { IProduct } from '../../../core/models/product';
import { ProductService } from '../../../core/services/product_service/product.service';
import { MatDividerModule } from '@angular/material/divider';
import IFeature from '../../../core/models/IFeature';
import { WideProductCardComponent } from "../../../shared/components/cards/wide-product-card/wide-product-card.component";
import { MatIcon } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { BreadcrumbComponent } from "../../../shared/components/breadcrumb/breadcrumb.component";
import BKProduct from 'app/core/models/BKProduct';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SpinnerS7Component } from "../../../shared/components/spinners/spinner-s7/spinner-s7.component";
import { SpinnerS7SmallComponent } from "../../../shared/components/spinners/spinner-s7-small/spinner-s7-small.component";

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
    InfiniteScrollModule, SpinnerS7Component, SpinnerS7SmallComponent]
})

export class SearchComponent {

  @ViewChild('searchInput') searchInput!: ElementRef;

  private _router: ActivatedRoute = inject(ActivatedRoute);
  private _productService = inject(ProductService);

  products: BKProduct[] = [];

  features: IFeature[] = [
    {
      title: "Memoria Ram",
      filters: ["12 a 19 GB", "20 a 39 GB", "40 GB o más"]
    },
    {
      title: "Precio",
      filters: ["Hasta 500.000", "500.000 a 1.000.000", "1.000.000 a 1.500.000", "1.500.000 o más"]
    },
    {
      title: "Marca",
      filters: ["AMD", "Intel", "Otra Marca", "Otra Marca"]
    },

  ]
    ;

  textToSearch: string = "";

  // Infinite Scroll
  page: number = 1;
  totalPages : number = this.page+1;
  loading: boolean = false;

  // TODO: Mejorar esta logica
  ngOnInit(): void {
    this._router.params.subscribe(params => {
      if (params['textToSearch']) {
        this.textToSearch = params['textToSearch'];
      }
      this.updateProductsInfo();
    })
    this.updateProductsInfo();
  }


  updateProductsInfo() {
    
    this.loading = true;
    this._productService.search(this.textToSearch, this.page).subscribe(productResponse => {
      
      this.totalPages = productResponse.pagination.totalPages;
      
      this.page = productResponse.pagination.currentPage;

      this.products = [...this.products, ...productResponse.products];
        this.loading = false;
    });
  }

  onScroll() {
    if (!this.loading && this.page <= this.totalPages) {
      this.page++;
      this.updateProductsInfo();
    }
  }





}
