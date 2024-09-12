import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import BKProduct from 'app/core/models/BKProduct';
import { BuildYourPcCartEntry } from 'app/core/models/BuildYourPcCartEntry';
import { BuildYourPcService } from 'app/core/services/build_your_pc/build-your-pc.service';
import { ProductService } from 'app/core/services/product_service/product.service';


@Component({
    template: ''
})
export abstract class CardsChildrenAbstractComponent {
  
  abstract section: string ; // section where we are
  abstract pathToContinue : string ; // section to continue
  idProductSelected : string  = '';

  _activatedRoute = inject(ActivatedRoute);
  _router = inject(Router);
  _productsService = inject(ProductService);
  _buildYourPcService = inject(BuildYourPcService);

  products: BKProduct[] = [];
  selectedProduct !: BKProduct;

  ngOnInit(): void {
    this.changeProducts();
    const entry= this._buildYourPcService.getEntryBySection(this.section);
    this.idProductSelected = entry?.selectedProductID || '';
  }

  changeProducts() {
    const requirement = this.getRequirement();
    this._productsService.getAllProductsByCategory(this.section, requirement).subscribe(productsResponse => {
      this.products = productsResponse.products;
    });

    this.setTheSelectedProductFirst();
  }

  setTheSelectedProductFirst(){
    const idSelected = this._buildYourPcService.getEntryBySection(this.section)?.selectedProductID;
    if(idSelected) {
      this._productsService.getProductById(idSelected).subscribe(product => {
        this.selectedProduct = product;
        this.products.unshift(product);
      })
    }
  }

  addToCart( cartEntry : BuildYourPcCartEntry) : void {
    const newEntry : BuildYourPcCartEntry = {
      categoryName: this.section,
      selectedProductName: cartEntry.selectedProductName,
      selectedProductQuantity: 1,
      selectedProductID: cartEntry.selectedProductID,
      selectedProductPrice: cartEntry.selectedProductPrice,
      selectedProductPhoto: cartEntry.selectedProductPhoto
    }
    this._buildYourPcService.addToCart(newEntry);
    this._router.navigate(['build-your-pc/' + this.pathToContinue]);
  }

  abstract getRequirement() : string;

  removeProductFromCart($event: BuildYourPcCartEntry) {
    this._buildYourPcService.removeEntryBySection(this.section);
    this.changeProducts();  
    this.idProductSelected = '';
  }
}
