import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import BKProduct from 'app/core/models/BKProduct';
import { ProductService } from 'app/core/services/product_service/product.service';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  selector: 'app-prueba',
  standalone: true,
  imports: [AutoCompleteModule, FormsModule,FloatLabelModule],
  templateUrl: './prueba.component.html',
  styleUrl: './prueba.component.scss'
})
export class PruebaComponent {


  items: BKProduct[] | undefined;

  selectedItem: any;

  suggestions!: any[] ;

  _productService: ProductService = inject(ProductService);
  
  search(event: AutoCompleteCompleteEvent) {
    this._productService.search(event.query).subscribe(productResponse => {
      this.suggestions = productResponse.products; console.log(this.suggestions);
    })
  }
}

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}
