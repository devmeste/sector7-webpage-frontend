import { Component, HostListener } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { IBanner } from 'app/core/models/IBanner';
import { CarouselModule, CarouselResponsiveOptions } from 'primeng/carousel';
@Component({
  selector: 'app-giant-carousel',
  standalone: true,
  imports: [CarouselModule, MatIcon],
  templateUrl: './giant-carousel.component.html',
  styleUrl: './giant-carousel.component.scss'
})
export class GiantCarouselComponent {


  banners: IBanner[] = [
    {
      id: "1",
      title: "Summer Sale",
      category: "Promotion",
      date: new Date("2024-08-01"),
      presignedUrl: "../../../../../assets/images/carousel/Imagen1.png",
      presignedUrl_tab: "../../../../../assets/images/carousel/Imagen1.png",
      presignedUrl_mob: "../../../../../assets/images/logos/Sector7LogoSmall.png"
    },
    {
      id: "2",
      title: "New Arrivals",
      category: "Product",
      date: new Date("2024-08-10"),
      presignedUrl: "../../../../../assets/images/carousel/Imagen2.png",
      presignedUrl_tab: "../../../../../assets/images/carousel/Imagen1.png",
      presignedUrl_mob: "../../../../../assets/images/logos/Sector7LogoSmall.png"
    },
    {
      id: "3",
      title: "Gaming Week",
      category: "Event",
      date: new Date("2024-08-15"),
      presignedUrl: "../../../../../assets/images/carousel/Imagen3.png",
      presignedUrl_tab: "../../../../../assets/images/carousel/Imagen3.png",
      presignedUrl_mob: "../../../../../assets/images/logos/Sector7LogoSmall.png"
    }
  ];


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
