import { Component, inject, Input } from '@angular/core';
import { TwoColorsCardComponent } from "../../../../shared/components/cards/two-colors-card/two-colors-card.component";
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, switchMap } from 'rxjs';
import BKProduct from 'app/core/models/BKProduct';
import { ProductService } from 'app/core/services/product_service/product.service';

@Component({
  selector: 'app-build-your-pc-cards-content',
  standalone: true,
  imports: [TwoColorsCardComponent],
  templateUrl: './build-your-pc-cards-content.component.html',
  styleUrl: './build-your-pc-cards-content.component.scss'
})
export class BuildYourPcCardsContentComponent {

  section: string = '';
  _activatedRoute = inject(ActivatedRoute);
  _productsService = inject(ProductService);

  products: BKProduct[] = [];

  ngOnInit(): void {

    this._activatedRoute.params.subscribe(params => {
      this.section = params['section'];

      this.changeProducts(this.section);
    })

    
  }
  changeProducts(section: string) {
    this._productsService.getAllProductsByCategory(this.section).subscribe(productsResponse => {
      this.products = productsResponse.products;
      console.log(this.products);
    })
  }


  // items = Array(12).fill(0); // later will be replaced by real data


}
