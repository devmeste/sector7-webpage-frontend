import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { IPurchase } from 'app/core/models/IPurchase';
import { PurchaseService } from 'app/core/services/purchase_service/purchase.service';
import { UserOrderCardComponent } from "../../../../shared/components/cards/user-order-card/user-order-card.component";
import { InfoMessageComponent } from "../../../../shared/components/messages/info-message/info-message.component";

@Component({
  selector: 'app-user-orders',
  standalone: true,
  imports: [JsonPipe, UserOrderCardComponent, InfoMessageComponent],
  templateUrl: './user-orders.component.html',
  styleUrl: './user-orders.component.scss'
})
export class UserOrdersComponent {

  _purchaseService = inject(PurchaseService);
  purchases$ !: IPurchase[];

  ngOnInit(): void {
    this._purchaseService.getAllPurchasesByUser().subscribe({
      next: (purchases) => {
        console.log(purchases);
        this.purchases$ = purchases
      }
    })
  }
}
