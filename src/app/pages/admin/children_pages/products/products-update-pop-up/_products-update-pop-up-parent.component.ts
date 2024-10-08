import { Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild, inject, viewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import BKProduct from 'app/core/models/BKProduct';
import { AdminService } from 'app/core/services/admin_service/admin.service';
import { InputDangerTextComponent } from "../../../../../shared/components/inputs/input-danger-text/input-danger-text.component";
import { NgClass, NgFor } from '@angular/common';
import { MessagePopUpComponent } from "../../../../../shared/components/pop_up/message-pop-up/message-pop-up.component";
import { MatIcon } from '@angular/material/icon';
import { CustomFormPopUp } from 'app/core/utils/custom-form-pop-up/custom.form.pop.up';
import { convertImageUrlToByteArray, convertNumberArrayToImage } from '../../../../../core/utils/CustomImageMannager';
import { ImageUploaderComponent } from "../../../../../shared/components/image-uploader/image-uploader.component";
import { SpinnerS7Component } from '@shared/components/spinners/spinner-s7/spinner-s7.component';

@Component({
  standalone: true,
  template: '',
  imports: [InputDangerTextComponent, NgClass, MessagePopUpComponent, ReactiveFormsModule, NgFor, MatIcon, ImageUploaderComponent, SpinnerS7Component]
})
export abstract class _ProductsUpdatePopUpParentComponent extends CustomFormPopUp {

  @Input({ required: true }) product_id !: string;
  @Input({ required: true }) product_USD_price !: number;
  @Output() itemWasUpdatedSuccesfully = new EventEmitter();


  @ViewChild('photoInput') photoInput !: ElementRef;

  protected _adminService = inject(AdminService);
  product$ !: BKProduct;

  productUpdatedSuccessfully = false;
  productUpdateFailed = false;
  errorMessage = '';

  photosArray: string[] = [];
  photosByteArray: number[][] = [];
  photosToShow: string[] = [];

  categoryName: string = '';

  // send
  loading: boolean = false;

  // fields
  sockets: string[] = [];
  generations: string[] = [];
  memory_types: string[] = [];


  // clear text of image input
  clearFileNameSignal = false;

  //handle the max number of photos
  maxPhotos = 4;
  disableImageInput = false;
  disableText = 'El maximo de fotos permitidas es ' + this.maxPhotos;

  override initializeForm(): void {
    if (this.product_id) {
      this._adminService.getProductById(this.product_id).subscribe(p => {
        this.product$ = p;
        this.form = this.formBuilder.group({
          id: [this.product$.id, [Validators.required]],
          categoryId: [this.product$.categoryId, [Validators.required]],
          brand: [this.product$.brand, [Validators.required]],
          model: [this.product$.model, [Validators.required]],
          price: [this.product_USD_price, [Validators.required]],
          actualStock: [this.product$.actualStock, [Validators.required]],
          viewStock: [this.product$.viewStock, [Validators.required]],
          title: [this.product$.title, [Validators.required]],
          description: [this.product$.description, [Validators.required]],
          isEnabled: [this.product$.isEnabled, []],
          isApproved: [this.product$.isApproved, []],
          photos: this.formBuilder.array([]),
          fieldsJSON: [this.product$.fieldsJSON, []],
          fieldsArray: this.formBuilder.array([]),
        })

        this.fillInitialPhotos(this.product$.photos || []);


        this.fillFieldsArray();

        this._adminService.getCategoryById(this.product$.categoryId).subscribe(c => {
          this.categoryName = c.name;
          if (this.categoryName == 'Procesadores') {
            this.getSockets();
            this.getGenerations();  
          }else if ( this.categoryName == 'Mothers' ){
            this.getMemoryTypes();
            this.getSockets();
            this.getGenerations();
          }
          else if( this.categoryName == 'Memorias'){
            this.getMemoryTypes();
          }
        })
      });
    }
  }


  async fillInitialPhotos(photos: string[]): Promise<void> {
    for (const photo of photos) {
      console.log(photo);
      if(!photo.includes('default-product-photo.png')){
        const byteArray = await convertImageUrlToByteArray(photo);
        this.photosArray.push(photo);
        this.photosByteArray.push(byteArray);
        this.disableImageInput = this.photosByteArray.length == this.maxPhotos ;
      }
    }
    setTimeout(() => {
      if (this.photoInput) {
        this.photoInput.nativeElement.value = '';
      }
    });
  }


  get photosArray2(): FormArray {
    if (this.form && this.form.controls["photos"]) {
      return this.form.controls["photos"] as FormArray;
    }
    return this.formBuilder.array([]);
  }

  addPhoto($event: number[]) {
    this.photosByteArray.push($event);
    const imageString = convertNumberArrayToImage($event);
    this.photosArray.push(imageString);
    this.clearFileNameSignal=false;
    if(this.photosArray.length == this.maxPhotos){
      this.disableImageInput=true;
    }
  }

  deletePhoto(i: number) {
    this.photosArray.splice(i, 1);
    this.photosByteArray.splice(i, 1);
    if(this.photosByteArray.length == 0){
      this.clearFileNameSignal=true;
    }
    if(this.disableImageInput ==true){
      this.disableImageInput=false;
    }
  }

  fillFieldsArray() {
    const fields = JSON.parse(this.product$.fieldsJSON);

    const keys = Object.keys(fields);
    keys.forEach(key => {

      const newFieldGroup = this.formBuilder.group({
        fieldName: [key],
        value: [fields[key], Validators.required]
      });
      this.fieldsArray.push(newFieldGroup);

    })

  }

  get fieldsArray() {
    return this.form.controls["fieldsArray"] as FormArray;
  }


  async splitPhotos(): Promise<number[][]> {
    const result = await Promise.all(
      this.photosArray2.value.map((photo: string) => convertImageUrlToByteArray(photo))
    );
    return result;
  }


  closeMessageModal(option: string) {
    switch (option) {
      case "productUpdatedSuccessfully": {
        this.productUpdatedSuccessfully = false
        this.closeUpdateModal();
      };
        break;
      case "productUpdateFailed": {
        this.productUpdateFailed = false
        // this.closeUpdateModal();
      };
        break;
    }
  }


  getSockets() {
    this._adminService.getAllSockets().subscribe((sockets) => {
      this.sockets = sockets.map(socket => socket.type);
    });
  }

  getGenerations() {
    this._adminService.getAllGenerations().subscribe((generation) => {
      this.generations  = generation.map(generation => generation.type);
    });
  }
  getMemoryTypes() {
    this._adminService.getAllMemoryTypes().subscribe((memory) => {
      this.memory_types = memory.map(memory => memory.type);
    });
  }
}



export interface Field {
  fieldName: string;
  value: string;
}
function getImagesByByteArray(photosByteArray: number[][]): string[] {
  console.log("Entro Aca");
  return photosByteArray.map(byteArray => {
    console.log(byteArray);
    // Convertimos el array de bytes a un Blob
    const blob = new Blob([new Uint8Array(byteArray)], { type: 'image/png' }); // Puedes ajustar el tipo de imagen si es necesario (image/png, etc.)

    // Creamos una URL temporal para la imagen a partir del Blob
    const imageUrl = URL.createObjectURL(blob);
    console.log(imageUrl);
    return imageUrl;
  });
}

