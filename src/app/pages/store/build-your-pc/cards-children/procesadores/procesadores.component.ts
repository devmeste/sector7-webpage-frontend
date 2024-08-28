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

  section: string = 'procesadores';
  

  override changeProducts() {
    const requirement = this.getRequirement();
    this._productsService.getAllProductsByCategory(this.section, requirement).subscribe(productsResponse => {
      this.products = productsResponse.products;
      console.log(this.products);
    })
  }

  override addToCart(id:string) {
    const newEntry :BuildYourPcCartEntry = {
      categoryName: 'procesadores',
      selectedProductName: id,
      selectedProductQuantity: 1,
    }
    this._buildYourPcService.addToCart(newEntry);
    this._router.navigate(['build-your-pc/mothers']);
  }

  getRequirement() {
    const linea = this._buildYourPcService.getEntryBySection('linea')?.selectedProductName;
    if (linea) {
      console.log("Linea : " + linea);
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
