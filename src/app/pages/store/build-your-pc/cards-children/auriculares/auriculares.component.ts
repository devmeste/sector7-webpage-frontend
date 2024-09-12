import { Component } from '@angular/core';
import { CardsChildrenAbstractComponent } from '../cards-children';
import { TwoColorsCardComponent } from "../../../../../shared/components/cards/two-colors-card/two-colors-card.component";

@Component({
  selector: 'app-auriculares',
  standalone: true,
  imports: [TwoColorsCardComponent],
  templateUrl: '../common-cards-children.html',
  styleUrl: './auriculares.component.scss'
})
export class AuricularesComponent  extends CardsChildrenAbstractComponent {

  override section: string = 'auriculares';
  override pathToContinue: string = 'teclados';

  override getRequirement(): string {
   return '';
  }

}
