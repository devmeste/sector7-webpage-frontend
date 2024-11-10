import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IPurchase } from 'app/core/models/IPurchase';
import { PurchaseService } from 'app/core/services/purchase_service/purchase.service';
import { EMPTY, switchMap } from 'rxjs';
import { CustomCurrencyPipe } from "../../../../core/pipes/custom_currency/custom-currency.pipe";
import { TopButtonReturnComponent } from "../../../../shared/components/top-button-return/top-button-return.component";

@Component({
  selector: 'app-user-order-details',
  standalone: true,
  imports: [
    JsonPipe,
    CustomCurrencyPipe,
    TopButtonReturnComponent
],
  templateUrl: './user-order-details.component.html',
  styleUrl: './user-order-details.component.scss',
})
export class UserOrderDetailsComponent {
    
  _purchaseService = inject(PurchaseService);

  purchase$ !: IPurchase;
  _activatedRoute = inject(ActivatedRoute);
  _router = inject(Router);

  ngOnInit(): void {
    this._activatedRoute.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id') || '';
      if (id) {
        return this._purchaseService.getPurchaseById(id); 
      }
      else{
        this._router.navigate(['user/orders']); // Redirect if no ID
        return EMPTY;
      }
    })).subscribe({
      next: (purchase) => {
        this.purchase$ = purchase;
      },
      error: (error) => {
        this._router.navigate(['user/orders']); // Redirect if no ID
      }
    }
      
    )
   
  }


 }
