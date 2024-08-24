import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import BKProduct from 'app/core/models/BKProduct';
import { BuildYourPcService } from 'app/core/services/build_your_pc/build-your-pc.service';
import { ProductService } from 'app/core/services/product_service/product.service';
import { TwoColorsCardComponent } from "../../../../../shared/components/cards/two-colors-card/two-colors-card.component";

@Component({
  selector: 'app-procesadores',
  standalone: true,
  imports: [TwoColorsCardComponent],
  templateUrl: './procesadores.component.html',
  styleUrl: './procesadores.component.scss'
})
export class ProcesadoresComponent {

  section: string = 'procesadores';
  _activatedRoute = inject(ActivatedRoute);
  _productsService = inject(ProductService);
  _buildYourPcService = inject(BuildYourPcService);

  products: BKProduct[] = [];

  ngOnInit(): void {
    this.changeProducts();
  }

  changeProducts() {
    const requirement = this.getRequirement();
    this._productsService.getAllProductsByCategory(this.section, requirement).subscribe(productsResponse => {
      this.products = productsResponse.products;
      console.log(this.products);
    })
  }

  addToCart(product: BKProduct) {

  }

  getRequirement() {
    const linea = this._buildYourPcService.getEntryBySection('linea')?.selectedProductName;
    if (linea) {
      console.log("Linea : " + linea);
      return linea;
    } else {
      return '';
    }
  }





  //1. Llamamos a la api de productos por categoria
  //2. pido el carrito
  //3. dependiendo la pantalla en la que estoy, pido el atributo que necesite para filtrar
  // 4.si en la pantalla que estoy, necesito algo de lo anterior, lo mando para atras



}
