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
  
  override getRequirement(): string {
    return ''
  }

  override addToCart(id:string) {
    const newEntry : BuildYourPcCartEntry = {
      categoryName: 'mothers',
      selectedProductName: id,
      selectedProductQuantity: 1,
    }
    this._buildYourPcService.addToCart(newEntry);
    this._router.navigate(['build-your-pc/memorias']);
  }

  section: string = 'mothers';

  


}
