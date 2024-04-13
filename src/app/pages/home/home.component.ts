import { Component } from '@angular/core';
import { ProductCarrouselComponent } from "../../shared/components/product-carrousel/product-carrousel.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [ProductCarrouselComponent]
})
export class HomeComponent {

}
