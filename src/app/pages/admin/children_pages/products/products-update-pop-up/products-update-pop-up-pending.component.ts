import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { InputDangerTextComponent } from "../../../../../shared/components/inputs/input-danger-text/input-danger-text.component";
import { NgClass, NgFor } from '@angular/common';
import { MessagePopUpComponent } from "../../../../../shared/components/pop_up/message-pop-up/message-pop-up.component";
import { MatIcon } from '@angular/material/icon';
import { _ProductsUpdatePopUpParentComponent, Field } from './_products-update-pop-up-parent.component';
import { IProductRequest } from 'app/core/models/IProductRequest';
import { ImageUploaderComponent } from "../../../../../shared/components/image-uploader/image-uploader.component";
import { convert_all_strings_into_byte_arrays, convertNumberArrayToImage } from 'app/core/utils/CustomImageMannager';
import { SpinnerS7Component } from "../../../../../shared/components/spinners/spinner-s7/spinner-s7.component";

@Component({
  selector: 'app-products-update-pop-up',
  standalone: true,
  templateUrl: './products-update-pop-up.component.html',
  styleUrls: ['./products-update-pop-up.component.scss', '../../../../../shared/styles/pop-up-styles.scss', '../../../../../shared/styles/admin_form.scss'],
  imports: [InputDangerTextComponent, NgClass, MessagePopUpComponent, ReactiveFormsModule, NgFor, MatIcon, ImageUploaderComponent, ImageUploaderComponent, SpinnerS7Component,SpinnerS7Component]
})
export class ProductsUpdatePopUpPendingComponent extends _ProductsUpdatePopUpParentComponent {




  override async send() {
    
    this.loading = true;

    let fields: any = {};

    (this.form.get('fieldsArray')?.value as Field[]).forEach((field: Field) => {
      fields[field.fieldName] = field.value;
    });

    let newFieldJson = JSON.stringify(fields);

    this.photosByteArray = await convert_all_strings_into_byte_arrays(this.photosArray);
    
    console.log(this.photosByteArray);

    const p: IProductRequest = {
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
      photosByteArray: this.photosByteArray,
      isEnabled: this.form.get("isEnabled")?.value,
      fieldsJSON: newFieldJson
    }

    console.log(p);

    this._adminService.updateProduct(p).subscribe({
      next: (v) => {
        this.loading = false;
        this.itemWasUpdatedSuccesfully.emit();
        this.productUpdatedSuccessfully = true
      },

      error: (error) => {
        this.loading = false;
        this.errorMessage = error.error.message;
        this.productUpdateFailed = true;
      }
    });
  }

  


}
