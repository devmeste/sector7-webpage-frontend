import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IPurchase } from 'app/core/models/IPurchase';
import { CustomCurrencyPipe } from 'app/core/pipes/custom_currency/custom-currency.pipe';

@Component({
  selector: 'app-user-order-card',
  standalone: true,
  imports: [CustomCurrencyPipe],
  templateUrl: './user-order-card.component.html',
  styleUrl: './user-order-card.component.scss'
})
export class UserOrderCardComponent {


  _router : Router = inject(Router)
  @Input({ required: true }) purchase !: IPurchase;

  changePaymentMethod() {
    throw new Error('Method not implemented.');
  }

  navigateToOrder() {
    this._router.navigate(['user-account/orders/' + this.purchase.id]);
  }
}
