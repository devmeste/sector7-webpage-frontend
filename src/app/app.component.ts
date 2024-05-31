import { AfterViewChecked, AfterViewInit, Component, ElementRef, HostListener, QueryList, ViewChild, ViewChildren, inject, viewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { NgClass, NgStyle } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatBadgeModule } from '@angular/material/badge';
import { CartService } from './core/services/cart_service/cart-service.service';
import { SearchBarComponent } from "./shared/components/search-bar/search-bar.component";
import { FormsModule } from '@angular/forms';
import { AuthService } from './core/services/auth_service/auth.service';
import { HeaderPanelLoggedInUserComponent } from "./shared/components/header/header-panel-logged-in-user/header-panel-logged-in-user.component";
import { HeaderPanelGeneralComponent } from "./shared/components/header/header-panel-general/header-panel-general.component";
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
    SearchBarComponent,
    FormsModule,
    HeaderPanelLoggedInUserComponent,
    HeaderPanelGeneralComponent
  ]
})
export class AppComponent {



  menuOpened: boolean = false;
  searchBarOpened: boolean = false;
  screenWidth: number;
  navbarfixed: boolean = false;
  totalProductsInCart: number = 9;
  _cartService: CartService = inject(CartService);
  searchBarClicked: boolean = false;
  mobileBreackPoint: number = 480;
  // showUserPanel: boolean = false;

  @ViewChild('searchInputDesktop', { static: false }) searchInputDesktop!: ElementRef;
  @ViewChild('searchInputMobile', { static: false }) searchInputMobile!: ElementRef;

  searchBarInputText: string = '';
  userMadeLogin: boolean = false;
  _authService: AuthService = inject(AuthService);

  constructor() {
    // set screenWidth on page load
    this.screenWidth = window.innerWidth;

    // Agregamos un listener de redimensionamiento
    window.addEventListener('resize', this.handleResize);
    // Llamamos a handleResize para establecer el estado inicial
    this.handleResize();

    this._cartService.getCartQuantity().subscribe(total => {
      this.totalProductsInCart = total;
    })

  }

  ngOnInit(): void {
    this._authService.isLoggedIn().subscribe(isLoggedIn => {
      this.userMadeLogin = isLoggedIn;
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

  // Search bar
  toggleSearchBar() {
    this.searchBarOpened = !this.searchBarOpened;
    if (this.searchBarOpened) {
      this.clickOnInputSearchBar();
    }
    else {
      this.closeSearchBar();
    }
  }

  clickOnInputSearchBar() {
    setTimeout(() => {
      if (this.screenWidth <= this.mobileBreackPoint) {
        if (this.searchInputMobile != undefined) {
          this.searchInputMobile.nativeElement.click();
          this.searchInputMobile.nativeElement.focus();
        }
        else {
        }
      }
      else {
        if (this.searchInputDesktop != undefined) {
          this.searchInputDesktop.nativeElement.click();
          this.searchInputDesktop.nativeElement.focus();
        }
      }
    },
    );
  }

  closeSearchBar() {
    this.searchBarOpened = false;
    this.searchBarInputText = '';

  }

  handleInputBlur() {
    this.searchBarClicked = false;
  }


  // toggleUserPanel() {
  // this.showUserPanel = !this.showUserPanel;
  // console.log(this.showUserPanel);
  // }



}
