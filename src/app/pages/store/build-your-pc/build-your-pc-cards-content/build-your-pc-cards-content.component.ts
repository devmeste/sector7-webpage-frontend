import { Component, inject, Input } from '@angular/core';
import { TwoColorsCardComponent } from "../../../../shared/components/cards/two-colors-card/two-colors-card.component";
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, switchMap } from 'rxjs';
import BKProduct from 'app/core/models/BKProduct';
import { ProductService } from 'app/core/services/product_service/product.service';
import { BuildYourPcService } from 'app/core/services/build_your_pc/build-your-pc.service';

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
  _buildYourPcService = inject(BuildYourPcService);

  products: BKProduct[] = [];

  ngOnInit(): void {

    this._activatedRoute.params.subscribe(params => {
      this.section = params['section'];
      this.changeProducts();
    })



  }
  changeProducts() {
    const requirement = this.getRequirement();
    this._productsService.getAllProductsByCategory(this.section, requirement).subscribe(productsResponse => {
      this.products = productsResponse.products;
    })
  }

  getRequirement() {
    switch (this.section.toLowerCase()) {
      case 'procesadores':
        const linea = this._buildYourPcService.getEntryBySection('linea')?.selectedProductName;
        console.log(linea);
        if (linea) {
          return linea;
        } else {
          return '';
        }
      case 'mothers':
        return 'socket'
      case 'memorias':
        return 'nose'
      default:
        return '';
    }
  }





  //1. Llamamos a la api de productos por categoria
  //2. pido el carrito
  //3. dependiendo la pantalla en la que estoy, pido el atributo que necesite para filtrar
  // 4.si en la pantalla que estoy, necesito algo de lo anterior, lo mando para atras



}
