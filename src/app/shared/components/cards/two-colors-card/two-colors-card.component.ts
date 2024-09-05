import { CurrencyPipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CustomCurrencyPipe } from "../../../../core/pipes/custom_currency/custom-currency.pipe";
import { BuildYourPcCartEntry } from '../../../../core/models/BuildYourPcCartEntry';
@Component({
  selector: 'app-two-colors-card',
  standalone: true,
  imports: [CurrencyPipe, CustomCurrencyPipe],
  templateUrl: './two-colors-card.component.html',
  styleUrl: './two-colors-card.component.scss'
})
export class TwoColorsCardComponent {

  @Input() selected = false;
  @Input({ required: true }) title!: string;
  @Input({ required: true }) price!: number;
  @Input({ required: true }) photo!: string;
  @Input({ required: true }) id!: string;
  @Output() addToCart = new EventEmitter<BuildYourPcCartEntry>();


  ngOnInit(): void {
    // console.log("En la card");
    // console.log("this.id " , this.id);
  }
  sendProduct() {
    this.addToCart.emit({ 'categoryName': this.title,'selectedProductPrice': this.price, selectedProductPhoto: this.photo, 'selectedProductID': this.id, 'selectedProductName': this.title, 'selectedProductQuantity': 1 })
  }
}
