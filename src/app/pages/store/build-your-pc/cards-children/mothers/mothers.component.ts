import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import BKProduct from 'app/core/models/BKProduct';
import { BuildYourPcService } from 'app/core/services/build_your_pc/build-your-pc.service';
import { ProductService } from 'app/core/services/product_service/product.service';
import { CardsChildrenAbstractComponent } from '../cards-children';
import { TwoColorsCardComponent } from "../../../../../shared/components/cards/two-colors-card/two-colors-card.component";

@Component({
  selector: 'app-mothers',
  standalone: true,
  imports: [TwoColorsCardComponent],
  templateUrl: './mothers.component.html',
  styleUrl: './mothers.component.scss'
})
export class MothersComponent extends CardsChildrenAbstractComponent {
  
  override getRequirement(): string {
    return ''
  }

  override addToCart(): void {
    
  }
  section: string = 'mothers';
  _activatedRoute = inject(ActivatedRoute);



}
