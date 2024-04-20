import { CurrencyPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-card-big',
  standalone: true,
  imports: [CurrencyPipe,RouterLink],
  templateUrl: './product-card-big.component.html',
  styleUrl: './product-card-big.component.scss'
})
export class ProductCardBigComponent {

  @Input( {required:true}) id !: string;
  @Input( {required:true}) name !: string;
  @Input( {required:true}) description !: string;
  @Input( {required:true}) img !: string;
  @Input( {required:true}) price !: number; 
}
