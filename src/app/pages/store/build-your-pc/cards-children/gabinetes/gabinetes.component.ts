import { Component } from '@angular/core';
import { TwoColorsCardComponent } from "../../../../../shared/components/cards/two-colors-card/two-colors-card.component";
import { CardsChildrenAbstractComponent } from '../cards-children';

@Component({
  selector: 'app-gabinetes',
  standalone: true,
  imports: [TwoColorsCardComponent],
  templateUrl: './gabinetes.component.html',
  styleUrl: './gabinetes.component.scss'
})
export class GabinetesComponent extends CardsChildrenAbstractComponent {

  override section: string = 'gabinetes';
  override pathToContinue: string = 'auriculares';

  override getRequirement(): string {
   return '';
  }

}
