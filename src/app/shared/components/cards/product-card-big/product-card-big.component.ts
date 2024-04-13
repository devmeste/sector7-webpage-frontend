import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-card-big',
  standalone: true,
  imports: [],
  templateUrl: './product-card-big.component.html',
  styleUrl: './product-card-big.component.scss'
})
export class ProductCardBigComponent {

  @Input( {required:true}) name !: string;
  @Input( {required:true}) description !: string;
  @Input( {required:true}) img !: string;
  @Input( {required:true}) price !: string; //TODO: change to number

}
