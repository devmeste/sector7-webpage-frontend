import { CurrencyPipe } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-two-colors-card',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './two-colors-card.component.html',
  styleUrl: './two-colors-card.component.scss'
})
export class TwoColorsCardComponent {

  @Input() selected = false;
  @Input({ required: true }) title!: string ;
  @Input({ required: true }) price!: number ;
  @Input({ required: true }) photo!: string ;
  @Input({ required: true }) id!: string ;
  
  
}
