import { CurrencyPipe, NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-top-metric',
  standalone: true,
  imports: [MatIcon,NgStyle, CurrencyPipe],
  templateUrl: './top-metric.component.html',
  styleUrl: './top-metric.component.scss'
})
export class TopMetricComponent {

  @Input({required:true}) text !: string ;
  @Input({required:true}) value !: number ;
  @Input ({required:true}) icon !: string;
  @Input ({required:true}) color !: string;
  @Input ({required:true}) currency !: boolean;

}
