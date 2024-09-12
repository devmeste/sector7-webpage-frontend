import { Component } from '@angular/core';
import { TwoColorsCardComponent } from "../../../../../shared/components/cards/two-colors-card/two-colors-card.component";
import { CardsChildrenAbstractComponent } from '../cards-children';

@Component({
  selector: 'app-almacenamiento',
  standalone: true,
  imports: [TwoColorsCardComponent],
  templateUrl: '../common-cards-children.html',
  styleUrl: './almacenamiento.component.scss'
})
export class AlmacenamientoComponent extends CardsChildrenAbstractComponent {

  override section: string = 'almacenamiento';
  override pathToContinue: string = 'fuentes';

  override getRequirement(): string {
   return '';
  }

}
