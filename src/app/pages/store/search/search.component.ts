import { Component, ElementRef, ViewChild, inject } from '@angular/core';
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
        RouterLink, BreadcrumbComponent]
})
export class SearchComponent {

  serchBarClicked: boolean = false;
  searchBarInputText: string = '';
  @ViewChild('searchInput') searchInput!: ElementRef;

  private _router: ActivatedRoute = inject(ActivatedRoute);
  private _productService = inject(ProductService);
  category !: number;

  products: IProduct[] = [];

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



  ngOnInit(): void {
    this._router.params.subscribe(params => {
      this.category = params['category'];
    })
    this._productService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  handleInputBlur() {
    this.serchBarClicked = false;
  }

  closeSearchBar() {
    this.searchBarInputText = '';
    if (this.searchInput) {
      this.searchInput.nativeElement.focus();
    }
  }




}
