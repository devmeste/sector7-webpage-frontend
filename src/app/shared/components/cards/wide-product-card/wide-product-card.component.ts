import { CurrencyPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wide-product-card',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './wide-product-card.component.html',
  styleUrl: './wide-product-card.component.scss'
})
export class WideProductCardComponent {

  @Input({ required: true }) id !: string;
  @Input({ required: true }) name !: string;
  @Input({ required: true }) img !: string;
  @Input({ required: true }) price !: number;
  constructor(private router: Router) {}

  navigateToProduct(id: string) {
    // Navegar a la página del producto con el ID proporcionado
    this.router.navigate(['product-details', id]);
  }
}
