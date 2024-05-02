import { Component, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { NgClass, NgStyle } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatBadgeModule} from '@angular/material/badge';
import { CartService } from './core/services/cart_service/cart-service.service';
@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [
        CommonModule,
        RouterOutlet,
        MatIconModule,
        MatButtonModule,
        MatSidenavModule,
        NgStyle,
        NgClass,
        MatMenuModule,
        MatToolbarModule,
        MatBadgeModule,
        RouterLink,
    ]
})
export class AppComponent {
  
  menuOpened: boolean = false;
  screenWidth: number;
  navbarfixed: boolean = false;
  totalProductsInCart: number =9;
  _cartService : CartService = inject(CartService);

  constructor() {
    // set screenWidth on page load
    this.screenWidth = window.innerWidth;
    // Agregamos un listener de redimensionamiento
    window.addEventListener('resize', this.handleResize);
    // Llamamos a handleResize para establecer el estado inicial
    this.handleResize();

    this._cartService.getCartQuantity().subscribe(total=>{
      this.totalProductsInCart=total;
    })
  }

  // method to determined the change navbar styles (navbar fixed animation and height change)
  @HostListener('window:scroll', ['$event']) onScroll() {
    if (window.scrollY > 50) {
      this.navbarfixed = true;
    }
    else {
      this.navbarfixed = false;
    }
  }

  // Method for handling resizing and displaying sidebar or navbar on desktop.
  private handleResize = () => {
    // set screenWidth on screen size change
    this.screenWidth = window.innerWidth;

    // Check if screenWidth is greater than 768 and close the menu if it's open
    if (this.screenWidth > 768) {
      this.menuOpened = false;
    }
  };

  //Close the hamburguer menu
  closeMenu() {
    this.menuOpened = false;
  }
}
