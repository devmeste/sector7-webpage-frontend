import { Component, OnInit, Signal, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
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
import { CustomCurrencyPipe } from "../../../core/pipes/custom_currency/custom-currency.pipe";
import { MessagePopUpComponent } from "../../../shared/components/pop_up/message-pop-up/message-pop-up.component";
import { AuthService } from 'app/core/services/auth_service/auth.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-product-details',
  standalone: true,
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
  imports: [CarouselModule, CarouselModule, TagModule, MatProgressSpinnerModule,RouterLink, MatIconModule, FeaturesTableComponent, FooterComponent, BkCarouselComponent, BreadcrumbComponent, CustomCurrencyPipe, MessagePopUpComponent]
})
export class ProductDetailsComponent implements OnInit {
  
redirectToCart() {
this._router.navigate(['cart']);
}


  private _activatedRouter: ActivatedRoute = inject(ActivatedRoute);
  private _router: Router = inject(Router);
  private _productService = inject(ProductService);
  private _cartService = inject(CartService);
  private _authService = inject(AuthService);

  productAddedToCart = signal<boolean>(false);
  isLoadingAddToCart = signal<boolean>(false);
  thereWasAnError= signal<boolean>(false);
  errorMessage = signal<string>('');

  cantidad !: number;

  id !: string;
  product!: BKProduct;
  mainImage = signal<string>('');

  showPopUpInvitingToRegister = false;

  responsiveOptions: CarouselResponsiveOptions[] = [
    {
      breakpoint: '481px',
      numVisible: 1,
      numScroll: 1
    }
  ];

  ngOnInit(): void {
    this._activatedRouter.params.subscribe(params => {
      this.id = params['id'];
      this.updateProductDetails(this.id);
      window.scrollTo(0, 0);
    })

    window.scrollTo(0, 0);

  }


  updateProductDetails(id: string) {
    this._productService.getProductById(this.id).subscribe({
      next: product => {
        this.product = product;
        if (product.photos) {
          this.mainImage.set(product.photos[0]);
        }
      },
      error: error => {
        if (error.status == 404) {
          this._router.navigate(['/error'])
        }
      }

    });
    this._cartService.getCartQuantity().subscribe(quantity => {
      this.cantidad = quantity
    })
  }

  descriptionEmpty(description: String) {
    return description.length !== 0;
  }




  changeMainImage(img: string) {
    this.mainImage.set(img);
  }


  addToCart(product: BKProduct) {

    this.isLoadingAddToCart.set(true);
    console.log("isLoading: "+this.isLoadingAddToCart());

    if(!this._authService.isAnyUserOrAdminLoggedIn()){
      this.isLoadingAddToCart.set(false);
      this.showPopUpInvitingToRegister= true;
      console.log("isLoading: "+this.isLoadingAddToCart());

    }else{

      const productToAdd: IProduct_Cart = {
        id: product.id,
        name: product.title,
        img: product.photos?.[0] || '',
        price: product.price,
        stock: product.viewStock,
        quantityRequested: 1
      }
  
      this._cartService.addToCart(productToAdd).subscribe({
        next: () => {
          this.isLoadingAddToCart.set(false)
          console.log("isLoading: "+this.isLoadingAddToCart());
          this.productAddedToCart.set(true);
        },
        error: (error) => {
          this.isLoadingAddToCart.set(false);
          this.errorMessage.set(error.error.message);
          this.thereWasAnError.set(true);

        }
      }
      );

    }


    
  }


  redirectToLogin() {
    this._router.navigate(['auth']);
  }

  redirectToHome() {
    this.showPopUpInvitingToRegister = false;
  }
}
