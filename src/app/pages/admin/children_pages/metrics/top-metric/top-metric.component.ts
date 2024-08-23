import { CurrencyPipe, NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { CustomCurrencyPipe } from "../../../../../core/pipes/custom_currency/custom-currency.pipe";

@Component({
  selector: 'app-top-metric',
  standalone: true,
  imports: [MatIcon, NgStyle, CurrencyPipe, CustomCurrencyPipe],
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
