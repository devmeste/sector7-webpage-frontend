import { Component, inject } from '@angular/core';
import { ProductCarrouselComponent } from "../../../shared/components/product-carrousel/product-carrousel.component";
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { StoreService } from 'app/core/services/store_service/store.service';
import { IBanner } from 'app/core/models/IBanner';
import { ImageUploaderComponent } from "../../../shared/components/image-uploader/image-uploader.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [ProductCarrouselComponent, FooterComponent, ImageUploaderComponent]
})
export class HomeComponent {
    
    _storeService : any = inject(StoreService);
    bannerMain: string ='';
    bannerSecondary: string = '';
    
    ngOnInit(): void {
        this._storeService.getBanner('main').subscribe( (banner: IBanner) => {
            this.bannerMain = banner.presignedUrl;
            console.log(this.bannerMain);
        })
        this._storeService.getBanner('secondary').subscribe( (banner: IBanner) => {
            this.bannerSecondary = banner.presignedUrl;
            console.log(this.bannerSecondary);
        })
    }
}
