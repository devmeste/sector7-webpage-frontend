import { Component } from '@angular/core';
import { CardsChildrenAbstractComponent } from '../cards-children';
import { TwoColorsCardComponent } from "../../../../../shared/components/cards/two-colors-card/two-colors-card.component";

@Component({
  selector: 'app-placas-de-video',
  standalone: true,
  imports: [TwoColorsCardComponent],
  templateUrl: './placas-de-video.component.html',
  styleUrl: './placas-de-video.component.scss'
})
export class PlacasDeVideoComponent extends CardsChildrenAbstractComponent {

  override section: string = 'placas de video';
  override pathToContinue: string = 'refrigeracion';

  override getRequirement(): string {
   return '';
  }

}
