import { Component } from '@angular/core';
import { TwoColorsCardComponent } from "../../../../../shared/components/cards/two-colors-card/two-colors-card.component";
import { CardsChildrenAbstractComponent } from '../cards-children';

@Component({
  selector: 'app-teclados',
  standalone: true,
  imports: [TwoColorsCardComponent],
  templateUrl: '../common-cards-children.html',
  styleUrl: './teclados.component.scss'
})
export class TecladosComponent  extends CardsChildrenAbstractComponent {
  override section: string = 'teclados';
  override pathToContinue: string = 'mouses';

  override getRequirement(): string {
   return '';
  }

}
