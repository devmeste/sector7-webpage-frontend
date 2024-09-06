import { Component, inject } from '@angular/core';
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
    
    _storeService : any = inject(StoreService);
    bannerMain: string ='';
    // bannerSecondary: string = '';
    
    ngOnInit(): void {
        this._storeService.getBanner('main').subscribe( (banner: IBanner) => {
            this.bannerMain = banner.presignedUrl;
        })
    }
}
