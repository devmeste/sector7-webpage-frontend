import { Component, ElementRef, HostListener, inject, ViewChild } from '@angular/core';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { StoreService } from 'app/core/services/store_service/store.service';
import { IBanner } from 'app/core/models/IBanner';
import { ImageUploaderComponent } from "../../../shared/components/image-uploader/image-uploader.component";
import { ProductCarrouselComponent } from '@shared/components/carousels/product-carrousel/product-carrousel.component';
import { GiantCarouselComponent } from "../../../shared/components/carousels/giant-carousel/giant-carousel.component";
import { SpinnerS7SmallComponent } from "../../../shared/components/spinners/spinner-s7-small/spinner-s7-small.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [ProductCarrouselComponent, FooterComponent, ImageUploaderComponent, GiantCarouselComponent, SpinnerS7SmallComponent]
})
export class HomeComponent {
    
    @ViewChild ('backgroundFixedLogo') backgroundFixedLogo!: ElementRef<HTMLElement>;


    @HostListener('window:scroll', [])
    onScroll(){
        if(this.backgroundFixedLogo){
            const scrollPosition = window.scrollY;
            const windowHeight = window.innerHeight;
            const backgroundFixedLogo = this.backgroundFixedLogo.nativeElement;
            backgroundFixedLogo.getBoundingClientRect();
            const distanceToTopViewport = backgroundFixedLogo.getBoundingClientRect().top;

            backgroundFixedLogo.style.transform = `translate(
                calc(-30% + ${scrollPosition * 0.2}px),
                calc(-60% + ${scrollPosition * 0.1}px)
            )`;        }

    }
}

