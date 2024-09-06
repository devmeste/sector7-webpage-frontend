import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import BKProduct from 'app/core/models/BKProduct';
import { BuildYourPcService } from 'app/core/services/build_your_pc/build-your-pc.service';
import { ProductService } from 'app/core/services/product_service/product.service';
import { CardsChildrenAbstractComponent } from '../cards-children';
import { TwoColorsCardComponent } from "../../../../../shared/components/cards/two-colors-card/two-colors-card.component";
import { BuildYourPcCartEntry } from 'app/core/models/BuildYourPcCartEntry';

@Component({
  selector: 'app-mothers',
  standalone: true,
  imports: [TwoColorsCardComponent],
  templateUrl: './mothers.component.html',
  styleUrl: './mothers.component.scss'
})
export class MothersComponent extends CardsChildrenAbstractComponent {

  override pathToContinue: string = 'memorias';
  override section: string = 'mothers';


  getRequirement() {
    return '';
  }




  override changeProducts() {
    const processorID = this._buildYourPcService.getEntryBySection('procesadores')?.selectedProductID;
    let socket = '';
    let generation = '';

    if (processorID) {
      const product = this._productsService.getProductById(processorID).subscribe(product => {

        let fieldsJSON = JSON.parse(product?.fieldsJSON);
        Object.keys(fieldsJSON).forEach(key => {
          if (key === 'Socket') {
            socket = fieldsJSON[key];
          } else if (key === 'Generación') {
            generation = fieldsJSON[key];
          }
        })

        if (socket && generation) {

          this._productsService.getAllProductsBySocketAndGeneration('Mothers', socket, generation).subscribe(productsResponse => {
            this.products = productsResponse.products;
          });

        } 

      }

      );
    }
  }

}
