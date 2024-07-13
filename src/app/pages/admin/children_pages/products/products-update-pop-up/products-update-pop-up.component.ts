import { Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild, inject, viewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import BKProduct from 'app/core/models/BKProduct';
import { AdminService } from 'app/core/services/admin_service/admin.service';
import { InputDangerTextComponent } from "../../../../../shared/components/inputs/input-danger-text/input-danger-text.component";
import { NgClass, NgFor } from '@angular/common';
import { MessagePopUpComponent } from "../../../../../shared/components/pop_up/message-pop-up/message-pop-up.component";
import { MatIcon } from '@angular/material/icon';
import { SplitLinkPipe } from 'app/core/pipes/splitLinks/split-link.pipe';
import { CustomFormPopUp } from 'app/core/utils/custom-form-pop-up/custom.form.pop.up';
// import {} from '../../../../../shared/';

@Component({
  selector: 'app-products-update-pop-up',
  standalone: true,
  templateUrl: './products-update-pop-up.component.html',
  styleUrls: ['./products-update-pop-up.component.scss', '../../../../../shared/styles/pop-up-styles.scss', '../../../../../shared/styles/admin_form.scss'],
  imports: [InputDangerTextComponent, NgClass, MessagePopUpComponent, ReactiveFormsModule, NgFor, MatIcon, SplitLinkPipe]
})
export class ProductsUpdatePopUpComponent extends CustomFormPopUp {

  @Input({ required: true }) product_id !: string;
  @Input({ required: true }) product_USD_price !: number;

  @ViewChild('photoInput') photoInput !: ElementRef;

  private formBuilder = inject(FormBuilder);
  private _adminService = inject(AdminService);
  product$ !: BKProduct;
  // private photos = [];


  productUpdatedSuccessfully = false;
  productUpdateFailed = false;
  errorMessage = '';

  photosArray: string[] = [];
  photosToShow: string[] = [];

  categoryName: string = '';

  form!: FormGroup;

  ngOnInit(): void {
    this._adminService.getProductById(this.product_id).subscribe(p => {
      this.product$ = p;
      console.log(p);
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


  send() {

    let fields: any = {};

    (this.form.get('fieldsArray')?.value as Field[]).forEach((field: Field) => {
      fields[field.fieldName] = field.value;
    });

    let newFieldJson = JSON.stringify(fields);

    const p: any = {
      id: this.form.get("id")?.value,
      categoryId: this.form.get("categoryId")?.value,
      brand: this.form.get("brand")?.value,
      model: this.form.get("model")?.value,
      price: parseFloat(this.form.get("price")?.value),
      actualStock: parseInt(this.form.get("actualStock")?.value),
      viewStock: parseInt(this.form.get("viewStock")?.value),
      title: this.form.get("title")?.value,
      isApproved: this.form.get("isApproved")?.value,
      description: this.form.get("description")?.value,
      photos: this.splitPhotos(),

      isEnabled: this.form.get("isEnabled")?.value,
      fieldsJSON: newFieldJson
    }
    console.log(p);
    this._adminService.updateProduct(p).subscribe({
      next: (v) => { this.productUpdatedSuccessfully = true },

      error: (error) => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.productUpdateFailed = true;
      }
    });
  }

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




interface Field {
  fieldName: string;
  value: string;
}
