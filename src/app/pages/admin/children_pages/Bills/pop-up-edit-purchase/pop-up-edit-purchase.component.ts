import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pop-up-edit-purchase',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './pop-up-edit-purchase.component.html',
  styleUrl: './pop-up-edit-purchase.component.scss',
})
export class PopUpEditPurchaseComponent {

  @Input({required: true}) purchaseId !: string

  

 }
