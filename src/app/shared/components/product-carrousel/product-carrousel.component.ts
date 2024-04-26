import { Component, OnInit, inject } from '@angular/core';
import { CarouselModule, CarouselResponsiveOptions } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { ProductCardBigComponent } from "../cards/product-card-big/product-card-big.component";
import { IProduct } from '../../../core/models/product';
import { ProductService } from '../../../core/services/product_service/product.service';


@Component({
    selector: 'app-product-carrousel',
    standalone: true,
    templateUrl: './product-carrousel.component.html',
    styleUrl: './product-carrousel.component.scss',
    imports: [CarouselModule, TagModule, ProductCardBigComponent]
})
export class ProductCarrouselComponent implements OnInit {

  _productService : ProductService = inject( ProductService );
  products !: IProduct [] ;

  ngOnInit(): void {
    this._productService.getProducts().subscribe( products => {
      this.products = products;
    })
  }
  

  responsiveOptions: CarouselResponsiveOptions[] = [
    {
      breakpoint: '10000px',
      numVisible: 4,
      numScroll: 1
    },
    {
      breakpoint: '1700px',
      numVisible: 3,
      numScroll: 1
    },
    {
      breakpoint: '1280px',
      numVisible: 3,
      numScroll: 1
    },
    {
      breakpoint: '1050px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '769px',  
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '700px',  
      numVisible: 1,
      numScroll: 1
    },
    {
      breakpoint: '481px',
      numVisible: 1,
      numScroll: 1
    }
  ];


}
