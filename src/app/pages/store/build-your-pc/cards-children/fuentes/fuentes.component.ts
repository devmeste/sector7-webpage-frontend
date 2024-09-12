import { Component } from '@angular/core';
import { CardsChildrenAbstractComponent } from '../cards-children';
import { TwoColorsCardComponent } from "../../../../../shared/components/cards/two-colors-card/two-colors-card.component";

@Component({
  selector: 'app-fuentes',
  standalone: true,
  imports: [TwoColorsCardComponent],
  templateUrl: '../common-cards-children.html',
  styleUrl: './fuentes.component.scss'
})
export class FuentesComponent extends CardsChildrenAbstractComponent {

  override section: string = 'fuentes';
  override pathToContinue: string = 'placas de video';

  override getRequirement(): string {
   return '';
  }

}
