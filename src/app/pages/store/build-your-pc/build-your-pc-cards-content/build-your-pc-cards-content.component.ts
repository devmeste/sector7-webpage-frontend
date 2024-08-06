import { Component } from '@angular/core';
import { TwoColorsCardComponent } from "../../../../shared/components/cards/two-colors-card/two-colors-card.component";

@Component({
  selector: 'app-build-your-pc-cards-content',
  standalone: true,
  imports: [TwoColorsCardComponent],
  templateUrl: './build-your-pc-cards-content.component.html',
  styleUrl: './build-your-pc-cards-content.component.scss'
})
export class BuildYourPcCardsContentComponent {
  

  items = Array(12).fill(0); // later will be replaced by real data


}
