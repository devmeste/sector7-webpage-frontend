import { Component } from '@angular/core';
import { CardsChildrenAbstractComponent } from '../cards-children';
import { TwoColorsCardComponent } from "../../../../../shared/components/cards/two-colors-card/two-colors-card.component";

@Component({
  selector: 'app-memorias',
  standalone: true,
  imports: [TwoColorsCardComponent],
  templateUrl: './memorias.component.html',
  styleUrl: './memorias.component.scss'
})
export class MemoriasComponent extends CardsChildrenAbstractComponent {

  
  override section: string = 'memorias';
  override pathToContinue: string = 'almacenamiento';


  override getRequirement(): string {
    return '';
  }

}
