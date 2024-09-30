import { Component } from '@angular/core';
import { CardsChildrenAbstractComponent } from '../cards-children';
import { TwoColorsCardComponent } from "../../../../../shared/components/cards/two-colors-card/two-colors-card.component";
import { BuildYourPcCartEntry } from 'app/core/models/BuildYourPcCartEntry';

@Component({
  selector: 'app-mouses',
  standalone: true,
  imports: [TwoColorsCardComponent],
  templateUrl: '../common-cards-children.html',
  styleUrl: './mouses.component.scss'
})
export class MousesComponent extends CardsChildrenAbstractComponent {

  override section: string = 'mouses';
  override pathToContinue: string = 'finish';

  override getRequirement(): string {
   return '';
  }

  override   addToCart( cartEntry : BuildYourPcCartEntry) : void {
    const newEntry : BuildYourPcCartEntry = {
      categoryName: this.section,
      selectedProductName: cartEntry.selectedProductName,
      selectedProductQuantity: 1,
      selectedProductID: cartEntry.selectedProductID,
      selectedProductPrice: cartEntry.selectedProductPrice,
      selectedProductPhoto: cartEntry.selectedProductPhoto
    }
    this._buildYourPcService.addToCart(newEntry);
    window.location.reload();
  }

}
