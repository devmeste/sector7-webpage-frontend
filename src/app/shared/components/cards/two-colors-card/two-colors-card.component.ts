import { CurrencyPipe, NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CustomCurrencyPipe } from "../../../../core/pipes/custom_currency/custom-currency.pipe";
import { BuildYourPcCartEntry } from '../../../../core/models/BuildYourPcCartEntry';
import { MatIcon } from '@angular/material/icon';
@Component({
  selector: 'app-two-colors-card',
  standalone: true,
  imports: [CurrencyPipe, CustomCurrencyPipe, NgClass, MatIcon],
  templateUrl: './two-colors-card.component.html',
  styleUrl: './two-colors-card.component.scss'
})
export class TwoColorsCardComponent {

  @Input({ required: true }) selected !: boolean;
  @Input({ required: true }) title!: string;
  @Input({ required: true }) price!: number;
  @Input({ required: true }) photo!: string;
  @Input({ required: true }) id!: string;
  @Output() addToCart = new EventEmitter<BuildYourPcCartEntry>();
  @Output() removeFromCart = new EventEmitter<BuildYourPcCartEntry>();


  ngOnInit(): void {

  }
  sendProduct() {
    this.addToCart.emit({ 'categoryName': this.title, 'selectedProductPrice': this.price, selectedProductPhoto: this.photo, 'selectedProductID': this.id, 'selectedProductName': this.title, 'selectedProductQuantity': 1 })
  }

  removeProduct() {
    this.removeFromCart.emit();
  }

}
