import { Component } from '@angular/core';
import { ProductCarrouselComponent } from "../../../shared/components/product-carrousel/product-carrousel.component";
import { FooterComponent } from '../../../shared/components/footer/footer.component';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [ProductCarrouselComponent, FooterComponent]
})
export class HomeComponent {
    
}
