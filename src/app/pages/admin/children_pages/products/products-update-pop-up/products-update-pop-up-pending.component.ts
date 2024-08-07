import { Component } from '@angular/core';
import { ReactiveFormsModule} from '@angular/forms';
import { InputDangerTextComponent } from "../../../../../shared/components/inputs/input-danger-text/input-danger-text.component";
import { NgClass, NgFor } from '@angular/common';
import { MessagePopUpComponent } from "../../../../../shared/components/pop_up/message-pop-up/message-pop-up.component";
import { MatIcon } from '@angular/material/icon';
import { _ProductsUpdatePopUpParentComponent, Field } from './_products-update-pop-up-parent.component';

@Component({
  selector: 'app-products-update-pop-up',
  standalone: true,
  templateUrl: './products-update-pop-up.component.html',
  styleUrls: ['./products-update-pop-up.component.scss', '../../../../../shared/styles/pop-up-styles.scss', '../../../../../shared/styles/admin_form.scss'],
  imports: [InputDangerTextComponent, NgClass, MessagePopUpComponent, ReactiveFormsModule, NgFor, MatIcon]
})
export class ProductsUpdatePopUpPendingComponent extends _ProductsUpdatePopUpParentComponent {

  override send() {

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
    
    this._adminService.updateProduct(p).subscribe({
      next: (v) => { 
        this.itemWasUpdatedSuccesfully.emit();
        this.productUpdatedSuccessfully = true 
      },

      error: (error) => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.productUpdateFailed = true;
      }
    });
  }  
}
