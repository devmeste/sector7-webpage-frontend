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
  
  override pathToContinue : string = 'memorias';
  override section: string = 'mothers';


  getRequirement() {
    const linea = this._buildYourPcService.getEntryBySection('linea')?.selectedProductName;
    if (linea) {
      console.log("Linea : " + linea);
      return linea;
    } else {
      // Aca mostraria un pop up que le pide que primero elija una linea...
      return '';
    }
  }
  


}
