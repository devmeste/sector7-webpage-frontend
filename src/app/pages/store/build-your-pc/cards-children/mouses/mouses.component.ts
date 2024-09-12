import { Component } from '@angular/core';
import { CardsChildrenAbstractComponent } from '../cards-children';
import { TwoColorsCardComponent } from "../../../../../shared/components/cards/two-colors-card/two-colors-card.component";

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

}
