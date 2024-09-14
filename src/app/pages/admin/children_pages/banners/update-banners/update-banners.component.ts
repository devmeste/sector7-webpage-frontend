import { Component } from '@angular/core';
import { UpdateForm } from '../../build_your_pc_filters/sockets/sockets-update-pop-up/update-form';
import { Observable } from 'rxjs';
import { IBanner, IBannerRequest } from 'app/core/models/IBanner';
import { InputDangerTextComponent } from "../../../../../shared/components/inputs/input-danger-text/input-danger-text.component";
import { MessagePopUpComponent } from "../../../../../shared/components/pop_up/message-pop-up/message-pop-up.component";
import { NgClass } from '@angular/common';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { convertImageUrlToByteArray, convertNumberArrayToImage } from 'app/core/utils/CustomImageMannager';
import { ImageUploaderComponent } from "../../../../../shared/components/image-uploader/image-uploader.component";

@Component({
  selector: 'app-update-banners',
  standalone: true,
  imports: [InputDangerTextComponent, MessagePopUpComponent, NgClass, ReactiveFormsModule, ImageUploaderComponent],
  templateUrl: './update-banners.component.html',
  styleUrl: './update-banners.component.scss'
})
export class UpdateBannersComponent extends UpdateForm {


  override element$!: IBanner;

  photoCellByteArray: number[] = [];
  photoTabletByteArray: number[] = [];
  photoPcByteArray: number[] = [];

  photoCellString: string = '';
  photoTabletString: string = '';
  photoPcString: string = '';

  category = '';

  override getElementToUpdate(): Observable<any> {
    return this._adminService.getBannerById(this.element_id);
  }
  override confirmNoNullFields(): boolean {
    throw new Error('Method not implemented.');
  }

  override initializeForm(): void {
    this._adminService.getBannerById(this.element_id).subscribe(s => {
      this.element$ = s;
      this.form = this.formBuilder.group({
        title: [s.title, [Validators.required]],
        category: [{ value: s.category, disabled: true }, [Validators.required]],
        date: [{ value: s.date, disabled: true }, [Validators.required]],
        routeUrl: [s.routeUrl, [Validators.required]],
        presignedUrlPc: [s.presignedUrlPc],
        presignedUrlTablet: [s.presignedUrlTablet],
        presignedUrlCellphone: [s.presignedUrlCellphone]
      })

      this.category = s.category;

      this.fillInitialPhotos(s.presignedUrlCellphone, s.presignedUrlTablet, s.presignedUrlPc);
    }
    )


  }
  async fillInitialPhotos(presignedUrlCellphone: string, presignedUrlTablet: string, presignedUrlPc: string) {

    if (presignedUrlCellphone && presignedUrlTablet && presignedUrlPc) {

      this.photoTabletByteArray = await convertImageUrlToByteArray(presignedUrlTablet);
      this.photoCellByteArray = await convertImageUrlToByteArray(presignedUrlCellphone);
      this.photoPcByteArray = await convertImageUrlToByteArray(presignedUrlPc);



      this.photoPcString = presignedUrlPc;
      this.photoCellString = presignedUrlCellphone;
      this.photoTabletString = presignedUrlTablet;
    }

  }

  updatePhoto($event: number[], option: string) {

    switch (option) {
      case 'pc':
        this.photoPcByteArray = $event;
        this.photoPcString = convertNumberArrayToImage($event);
        break;

      case 'tablet':
        this.photoTabletByteArray = $event;
        this.photoTabletString = convertNumberArrayToImage($event);
        break;
      case 'cellphone':
        this.photoCellByteArray = $event;
        this.photoCellString = convertNumberArrayToImage($event);
        break;
    }


  }

  override send($event: SubmitEvent): void {

    if (this.form.valid) {
      const banner: IBannerRequest = {
        title : this.form.get('title')?.value,
        category : this.category,
        routeUrl : this.form.value.routeUrl,
        photoPc : this.photoPcByteArray,
        photoTablet : this.photoTabletByteArray,
        photoCellphone : this.photoCellByteArray
      }

      console.log(banner);

      this._adminService.updateBanner(banner, this.element_id).subscribe(s => {
        alert('Se actualizo correctamente');
      })
    }
  }
}