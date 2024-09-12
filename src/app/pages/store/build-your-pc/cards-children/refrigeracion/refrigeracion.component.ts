import { Component } from '@angular/core';
import { TwoColorsCardComponent } from "../../../../../shared/components/cards/two-colors-card/two-colors-card.component";
import { CardsChildrenAbstractComponent } from '../cards-children';

@Component({
  selector: 'app-refrigeracion',
  standalone: true,
  imports: [TwoColorsCardComponent],
  templateUrl: '../common-cards-children.html',
  styleUrl: './refrigeracion.component.scss'
})
export class RefrigeracionComponent  extends CardsChildrenAbstractComponent {
  override section: string = 'refrigeracion';
  override pathToContinue: string = 'monitores';

  override getRequirement(): string {
   return '';
  }



}
