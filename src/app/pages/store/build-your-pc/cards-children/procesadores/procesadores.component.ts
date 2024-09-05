import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import BKProduct from 'app/core/models/BKProduct';
import { BuildYourPcService } from 'app/core/services/build_your_pc/build-your-pc.service';
import { ProductService } from 'app/core/services/product_service/product.service';
import { TwoColorsCardComponent } from "../../../../../shared/components/cards/two-colors-card/two-colors-card.component";
import { BuildYourPcCartEntry } from 'app/core/models/BuildYourPcCartEntry';
import { CardsChildrenAbstractComponent } from '../cards-children';

@Component({
  selector: 'app-procesadores',
  standalone: true,
  imports: [TwoColorsCardComponent],
  templateUrl: './procesadores.component.html',
  styleUrl: './procesadores.component.scss'
})
export class ProcesadoresComponent extends CardsChildrenAbstractComponent {
  
  override section: string = 'procesadores';
  override pathToContinue: string = 'mothers';
  

  override changeProducts() {
    const requirement = this.getRequirement();
    this._productsService.getAllProductsByCategory(this.section, requirement).subscribe(productsResponse => {
      this.products = productsResponse.products;
      console.log(this.products);
    })
  }

  override addToCart( cartEntry :BuildYourPcCartEntry ) {

    // Si no hay seleccion del componente que sigue.. 
    // lo agrego de una

    // si ya hay algo seleccionado en el siguiente 
    

    const newEntry :BuildYourPcCartEntry = {
      selectedProductID: cartEntry.selectedProductID,
      categoryName: 'procesadores',
      selectedProductName: cartEntry.selectedProductName,
      selectedProductQuantity: 1,
      selectedProductPrice: cartEntry.selectedProductPrice,
      selectedProductPhoto: cartEntry.selectedProductPhoto
    }
    this._buildYourPcService.addToCart(newEntry);
    this._router.navigate(['build-your-pc/mothers']);
  }

  getRequirement() {
    const linea = this._buildYourPcService.getEntryBySection('linea')?.selectedProductName;
    if (linea) {
      return linea;
    } else {
      return '';
    }
  }



  //1. Llamamos a la api de productos por categoria
  //2. pido el carrito
  //3. dependiendo la pantalla en la que estoy, pido el atributo que necesite para filtrar
  // 4.si en la pantalla que estoy, necesito algo de lo anterior, lo mando para atras



}
