import { Component, HostListener, inject, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { IBanner } from 'app/core/models/IBanner';
import { StoreService } from 'app/core/services/store_service/store.service';
import { CarouselModule, CarouselResponsiveOptions } from 'primeng/carousel';
@Component({
  selector: 'app-giant-carousel',
  standalone: true,
  imports: [CarouselModule, MatIcon],
  templateUrl: './giant-carousel.component.html',
  styleUrl: './giant-carousel.component.scss'
})
export class GiantCarouselComponent {

  @Input () category = '';
  _storeService : StoreService= inject(StoreService);


  banners: IBanner[] = [
    
  ];
  
  ngOnInit(): void {
      this._storeService.getBannersByCategory(this.category).subscribe(
        banners =>{ 
          this.banners = banners;
        }
      );
  }
  
 


  responsiveOptions: CarouselResponsiveOptions[] = [
    {
      breakpoint: '481px',
      numVisible: 1,
      numScroll: 1
    }
  ];

  screenWidth : number = window.innerWidth;

  // Escucha el evento resize de la ventana
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.screenWidth = window.innerWidth;
  }

}
