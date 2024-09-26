import { CurrencyPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CustomCurrencyPipe } from "../../../../core/pipes/custom_currency/custom-currency.pipe";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-bk-card',
  standalone: true,
  imports: [CurrencyPipe, RouterLink, CustomCurrencyPipe],
  templateUrl: './bk-card.component.html',
  styleUrl: './bk-card.component.scss'
})
export class BkCardComponent {
  
  @Input( {required:true}) id !: string;
  @Input( {required:true}) name !: string;
  @Input( {required:true}) img !: string;
  @Input( {required:true}) price !: number; 

}
