import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IProduct } from '../../../core/models/product';
import { ProductService } from '../../../core/services/product_service/product.service';
import { CarouselModule, CarouselResponsiveOptions } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { MatIconModule } from '@angular/material/icon';
import { FeaturesTableComponent } from "./features-table/features-table.component";
import { CartService } from '../../../core/services/cart_service/cart-service.service';
import { IProduct_Cart } from '../../../core/models/product_cart';
import { FooterComponent } from "../../../shared/components/footer/footer.component";
import { BkCarouselComponent } from "../../../shared/components/carousels/bk-carousel/bk-carousel.component";
import { BreadcrumbComponent } from "../../../shared/components/breadcrumb/breadcrumb.component";
import BKProduct from 'app/core/models/BKProduct';
import { SplitLinkPipe } from 'app/core/pipes/splitLinks/split-link.pipe';

@Component({
  selector: 'app-product-details',
  standalone: true,
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
  imports: [CarouselModule, CarouselModule, TagModule, RouterLink, MatIconModule, FeaturesTableComponent, FooterComponent, BkCarouselComponent, BreadcrumbComponent, SplitLinkPipe]
})
export class ProductDetailsComponent implements OnInit {

  private _router: ActivatedRoute = inject(ActivatedRoute);
  private _productService = inject(ProductService);
  private _cartService = inject(CartService);
  cantidad !: number;

  id !: string;
  product!: BKProduct;
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
      this.updateProductDetails(this.id);
    })

  }


  updateProductDetails(id: string) {
    this._productService.getProductById(this.id).subscribe(
      product => {
        this.product = product;
        if (product.photos) {
          this.mainImage.set(product.photos[0]);
        } else {
          //TODO: conseguir una foto por defecto
        }
      }
    );
    this._cartService.getCartQuantity().subscribe(quantity =>{
      this.cantidad = quantity
    })
  }

  


  changeMainImage(img: string) {
    this.mainImage.set(img);
  }


  addToCart(product: BKProduct) {

    const productToAdd: IProduct_Cart = {
      id: product.id,
      name: product.title,
      img: product.photos?.[0] || '',
      price: product.price,
      stock: product.viewStock,
      quantityRequested: 0
    }

    this._cartService.addToCart(productToAdd);
  }
}
