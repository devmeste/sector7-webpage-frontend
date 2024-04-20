import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Product } from '../../../core/models/product';
import { ProductService } from '../../../core/services/product_service/product.service';
import { CarouselModule, CarouselResponsiveOptions } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CarouselModule, CarouselModule, TagModule, RouterLink, MatIconModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {

  private _router: ActivatedRoute = inject(ActivatedRoute);
  private _productService = inject(ProductService);

  id !: string;
  product !: Product | undefined;
  mainImage = signal<string>('');
  responsiveOptions: CarouselResponsiveOptions[] = [
    {
      breakpoint: '481px',
      numVisible: 1,
      numScroll: 1
    }
  ];


  ngOnInit(): void {
    this._router.params.subscribe(params => {
      this.id = params['id'];
    })

    this.product = this._productService.getProductById(this.id);

    if (this.product === undefined) {
      //FIXME: mostrar modal de error y luego redirigir al home, dado que pueden haber ingresado cualquier id en la url
    }
    else {
      this.mainImage.set(this.product.imgs[0]);
    }
  }

 
  changeMainImage(img: string) {
    this.mainImage.set(img);
  }

}
