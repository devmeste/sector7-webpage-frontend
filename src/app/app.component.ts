import { AfterViewChecked, AfterViewInit, Component, ElementRef, HostListener, QueryList, ViewChild, ViewChildren, inject, viewChildren } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
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
import { ProductService } from './core/services/product_service/product.service';
import BKProduct from './core/models/BKProduct';
import { ProductResponse } from './core/models/ProductResponse';
import { Observable, of } from 'rxjs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    AsyncPipe,
    CommonModule,
    RouterOutlet,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    NgStyle,
    NgClass,
    MatAutocompleteModule,
    MatMenuModule,
    MatToolbarModule,
    MatBadgeModule,
    RouterLink,
    SearchBarComponent,
    FormsModule,
    HeaderPanelLoggedInUserComponent,
    HeaderPanelGeneralComponent,
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
  user !: any ;


  @ViewChild('searchInputDesktop', { static: false }) searchInputDesktop!: ElementRef;
  @ViewChild('searchInputMobile', { static: false }) searchInputMobile!: ElementRef;

  searchBarInputText: string = '';
  userMadeLogin: boolean = false;
  adminMadeLogin: boolean = false;
  _authService: AuthService = inject(AuthService);
  _productService: ProductService = inject(ProductService);
  _router = inject(Router);
  productsBySearch$!: Observable<ProductResponse>;

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

  search(value: any) {
    if (value == '' || value == null) return;
    this.productsBySearch$ = this._productService.search(value);
  }


  ngOnInit(): void {
    this._authService.isUserLoggedIn$().subscribe(isLoggedIn => {
      this.userMadeLogin = isLoggedIn;
      // if(this.userMadeLogin){
      //   this._authService.getUser('user').subscribe(user => {
      //       this.user = user;
      //   })
      // }
    })

    this._authService.isAdminLoggedIn$().subscribe(isAdminLoggedIn => {
      this.adminMadeLogin = isAdminLoggedIn;
    //   this._authService.getUser('admin').subscribe(user => {
    //     this.user = user;
    // })
    })
    console.log("App component");
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
    this.clearProductsBySearch();
  }

  handleInputBlur() {
    this.searchBarClicked = false;
  }

  goToProductDetails(id: string) {
    this._router.navigate(['/product-details', id]);
    this.closeSearchBar();
    this.clearProductsBySearch();
  }

  clearProductsBySearch() {
    this.productsBySearch$ = of();
  }

  selectedIndex: number = -1;
  handleKeydownInSearchBar($event: KeyboardEvent) {
    if ($event.key === 'ArrowDown') {
      this.moveSelection(1);
    } else if ($event.key === 'ArrowUp') {
      this.moveSelection(-1);
    } else if ($event.key === 'Enter') {
        this.goToSearchComponentWithTextWirted();
    }
  }

  moveSelection(step: number) {
    if (this.productsBySearch$) {
      this.productsBySearch$.subscribe(response => {
        const maxIndex = response.products.length - 1;
        this.selectedIndex = (this.selectedIndex + step + response.products.length) % response.products.length;
        this.searchBarInputText = response.products[this.selectedIndex]?.title || '';
      });
    }
  }

  goToSearchComponentWithTextWirted() {
    if (this.searchBarInputText !== "") {
     this._router.navigate(['/search', this.searchBarInputText]);
     this.closeSearchBar();
    }
  }
}
