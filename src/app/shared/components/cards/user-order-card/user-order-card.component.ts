import { Component, inject, Input, signal } from '@angular/core';
import { Router } from '@angular/router';
import { IPurchase } from 'app/core/models/IPurchase';
import { CustomCurrencyPipe } from 'app/core/pipes/custom_currency/custom-currency.pipe';
import { ChangePaymentMethodPopUpComponent } from "./change-payment-method-pop-up/change-payment-method-pop-up.component";

@Component({
  selector: 'app-user-order-card',
  standalone: true,
  imports: [CustomCurrencyPipe, ChangePaymentMethodPopUpComponent],
  templateUrl: './user-order-card.component.html',
  styleUrl: './user-order-card.component.scss'
})
export class UserOrderCardComponent {

  _router : Router = inject(Router)
  @Input({ required: true }) purchase !: IPurchase;
  showChangePaymentMethodPopUp = signal<boolean>(false);

  changePaymentMethod() {
    this.showChangePaymentMethodPopUp.set(true);
  }

  navigateToOrder() {
    this._router.navigate(['user-account/orders/' + this.purchase.id]);
  }
}
