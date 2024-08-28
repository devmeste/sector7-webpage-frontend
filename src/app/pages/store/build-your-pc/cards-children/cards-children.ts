import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import BKProduct from 'app/core/models/BKProduct';
import { BuildYourPcService } from 'app/core/services/build_your_pc/build-your-pc.service';
import { ProductService } from 'app/core/services/product_service/product.service';


@Component({
    template: ''
})
export abstract class CardsChildrenAbstractComponent {
    abstract section: string ;
  
  _activatedRoute = inject(ActivatedRoute);
  _router = inject(Router);
  _productsService = inject(ProductService);
  _buildYourPcService = inject(BuildYourPcService);

  products: BKProduct[] = [];

  ngOnInit(): void {
    this.changeProducts();
  }

  changeProducts() {
    const requirement = this.getRequirement();
    this._productsService.getAllProductsByCategory(this.section, requirement).subscribe(productsResponse => {
      this.products = productsResponse.products;
      // console.log(this.products);
    });
  }

  abstract addToCart(id:string) : void ;

  abstract getRequirement() : string;
}
