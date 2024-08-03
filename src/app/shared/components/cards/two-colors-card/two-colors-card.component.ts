import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-two-colors-card',
  standalone: true,
  imports: [],
  templateUrl: './two-colors-card.component.html',
  styleUrl: './two-colors-card.component.scss'
})
export class TwoColorsCardComponent {

  @Input() selected = false;

}
