import { Component } from '@angular/core';
import { CarouselModule, CarouselResponsiveOptions } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { ProductCardBigComponent } from "../cards/product-card-big/product-card-big.component";
import { Product } from '../../../shop/models/product';


@Component({
    selector: 'app-product-carrousel',
    standalone: true,
    templateUrl: './product-carrousel.component.html',
    styleUrl: './product-carrousel.component.scss',
    imports: [CarouselModule, TagModule, ProductCardBigComponent]
})
export class ProductCarrouselComponent {

  products : Product [] = [
    {id:"1", name: 'Procesador AMD RYZEN 3 3200G 4.0GHz Turbo + Radeon Vega 8 AM4 Wraith Stealth Cooler', description: 'Product 1 description', 
    img: '../../../../assets/images/products/keyboard.png', price: 1000},
    
    {id:"2", name: 'Procesador AMD RYZEN 3 3200G 4.0GHz Turbo + Radeon Vega 8 AM4 Wraith Stealth Cooler', description: 'Product 2 description', 
    img: '../../../../assets/images/products/keyboard.png', price: 1000},
    
    {id:"3", name: 'Procesador AMD RYZEN 3 3200G 4.0GHz Turbo + Radeon Vega 8 AM4 Wraith Stealth Cooler', description: 'Product 3 description', 
    img: '../../../../assets/images/products/keyboard.png', price: 1000},
    
    {id:"4", name: 'Procesador AMD RYZEN 3 3200G 4.0GHz Turbo + Radeon Vega 8 AM4 Wraith Stealth Cooler', description: 'Product 4 description', 
    img: '../../../../assets/images/products/keyboard.png', price: 1000},
    
    {id:"5", name: 'Procesador AMD RYZEN 3 3200G 4.0GHz Turbo + Radeon Vega 8 AM4 Wraith Stealth Cooler', description: 'Product 5 description', 
    img: '../../../../assets/images/products/keyboard.png', price: 1000},

    {id:"6", name: 'Procesador AMD RYZEN 3 3200G 4.0GHz Turbo + Radeon Vega 8 AM4 Wraith Stealth Cooler', description: 'Product 6 description', 
    img: '../../../../assets/images/products/keyboard.png', price: 1000},

    {id:"7", name: 'Procesador AMD RYZEN 3 3200G 4.0GHz Turbo + Radeon Vega 8 AM4 Wraith Stealth Cooler', description: 'Product 7 description', 
    img: '../../../../assets/images/products/keyboard.png', price: 1000},

    {id:"8", name: 'Procesador AMD RYZEN 3 3200G 4.0GHz Turbo + Radeon Vega 8 AM4 Wraith Stealth Cooler', description: 'Product 8 description', 
    img: '../../../../assets/images/products/keyboard.png', price: 1000},

    {id:"9", name: 'Procesador AMD RYZEN 3 3200G 4.0GHz Turbo + Radeon Vega 8 AM4 Wraith Stealth Cooler', description: 'Product 9 description', 
    img: '../../../../assets/images/products/keyboard.png', price: 1000},
    {id:"10", name: 'Procesador AMD RYZEN 3 3200G 4.0GHz Turbo + Radeon Vega 8 AM4 Wraith Stealth Cooler', description: 'Product 9 description', 
    img: '../../../../assets/images/products/keyboard.png', price: 1000},
    
  ];

  responsiveOptions: CarouselResponsiveOptions[] = [
    {
      breakpoint: '10000px',
      numVisible: 4,
      numScroll: 2
    },
    {
      breakpoint: '1700px',
      numVisible: 3,
      numScroll: 1
    },
    {
      breakpoint: '1280px',
      numVisible: 3,
      numScroll: 2
    },
    {
      breakpoint: '1050px',
      numVisible: 2,
      numScroll: 2
    },
    {
      breakpoint: '769px',  
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '700px',  
      numVisible: 1,
      numScroll: 1
    },
    {
      breakpoint: '481px',
      numVisible: 1,
      numScroll: 1
    }
  ];

}
