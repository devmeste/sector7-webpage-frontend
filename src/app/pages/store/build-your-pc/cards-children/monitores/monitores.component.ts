import { Component } from '@angular/core';
import { CardsChildrenAbstractComponent } from '../cards-children';
import { TwoColorsCardComponent } from "../../../../../shared/components/cards/two-colors-card/two-colors-card.component";

@Component({
  selector: 'app-monitores',
  standalone: true,
  imports: [TwoColorsCardComponent],
  templateUrl: './monitores.component.html',
  styleUrl: './monitores.component.scss'
})
export class MonitoresComponent  extends CardsChildrenAbstractComponent {
  override section: string = 'monitores';
  override pathToContinue: string = 'gabinetes';

  override getRequirement(): string {
   return '';
  }


}
