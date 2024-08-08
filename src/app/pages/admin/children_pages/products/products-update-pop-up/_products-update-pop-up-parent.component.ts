import { Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild, inject, viewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import BKProduct from 'app/core/models/BKProduct';
import { AdminService } from 'app/core/services/admin_service/admin.service';
import { InputDangerTextComponent } from "../../../../../shared/components/inputs/input-danger-text/input-danger-text.component";
import { NgClass, NgFor } from '@angular/common';
import { MessagePopUpComponent } from "../../../../../shared/components/pop_up/message-pop-up/message-pop-up.component";
import { MatIcon } from '@angular/material/icon';
import { CustomFormPopUp } from 'app/core/utils/custom-form-pop-up/custom.form.pop.up';
// import {} from '../../../../../shared/';

@Component({
  standalone: true,
  template: '',
  imports: [InputDangerTextComponent, NgClass, MessagePopUpComponent, ReactiveFormsModule, NgFor, MatIcon]
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
  photosToShow: string[] = [];

  categoryName: string = '';

  override initializeForm(): void {
    if(this.product_id){
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
        })
      });
    }
  }



  fillInitialPhotos(photos: string[]): void {
    photos.forEach(photo => this.photosArray2.push(this.formBuilder.control(photo, [])));
    setTimeout(() => {
      if (this.photoInput) {
        this.photoInput.nativeElement.value = '';
      }
    });
  }


  get photosArray2() {
    return this.form.controls["photos"] as FormArray;
  }


  addPhoto() {
    const p = this.photoInput.nativeElement.value;
    if (p.trim().length == 0 || p == null) {
      return;
    }
    this.photosArray2.push(this.formBuilder.control(p, []));
    this.photoInput.nativeElement.value = '';
  }

  deletePhoto(i: number) {
    this.photosArray2.removeAt(i);
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


//   abstract send() : void;  

  splitPhotos(): string[] {
    let result = this.photosArray2.value.map((photo: string) => photo.split('!&!').pop());
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
  
}


export interface Field {
  fieldName: string;
  value: string;
}
