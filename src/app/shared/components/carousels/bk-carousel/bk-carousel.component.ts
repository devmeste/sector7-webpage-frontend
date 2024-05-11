import { Component, inject } from '@angular/core';
import { CarouselModule, CarouselResponsiveOptions } from 'primeng/carousel';
import { ProductService } from '../../../../core/services/product_service/product.service';
import { IProduct } from '../../../../core/models/product';
import { ProductCardBigComponent } from '../../cards/product-card-big/product-card-big.component';
import { TagModule } from 'primeng/tag';
import { BkCardComponent } from '../../cards/bk-card/bk-card.component';

@Component({
  selector: 'app-bk-carousel',
  standalone: true,
  imports: [CarouselModule, TagModule, ProductCardBigComponent, BkCardComponent],
  templateUrl: './bk-carousel.component.html',
  styleUrl: './bk-carousel.component.scss'
})
export class BkCarouselComponent {


  _productService: ProductService = inject(ProductService);
  products !: IProduct[];

  ngOnInit(): void {
    this._productService.getProducts().subscribe(products => {
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
      breakpoint: '760px',
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
