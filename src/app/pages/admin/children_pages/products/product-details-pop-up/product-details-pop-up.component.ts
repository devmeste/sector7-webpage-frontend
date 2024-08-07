import { Component, EventEmitter, HostListener, Input, Output, inject } from '@angular/core';
import { InputDangerTextComponent } from "../../../../../shared/components/inputs/input-danger-text/input-danger-text.component";
import BKProduct from 'app/core/models/BKProduct';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminService } from 'app/core/services/admin_service/admin.service';
import { CommonModule, NgFor } from '@angular/common';
import { CustomFormPopUp } from 'app/core/utils/custom-form-pop-up/custom.form.pop.up';

@Component({
  selector: 'app-product-details-pop-up',
  standalone: true,
  templateUrl: './product-details-pop-up.component.html',
  styleUrls: ['./product-details-pop-up.component.scss', '../../../../../shared/styles/admin_form.scss', '../../../../../shared/styles/pop-up-styles.scss',
    // '../products-update-pop-up/products-update-pop-up.component.scss'
  ],
  imports: [InputDangerTextComponent, ReactiveFormsModule, NgFor]
})
export class ProductDetailsPopUpComponent extends CustomFormPopUp {


  @Input({ required: true }) product_id !: string;
  @Input({ required: true }) product_USD_price !: number;
  private _adminService = inject(AdminService);

  product$ !: BKProduct;
  private photos = [];

  photosToShow: string[] = [];


  override initializeForm(): void {
    if (this.product_id) {
      this._adminService.getProductById(this.product_id).subscribe(p => {
        this.product$ = p;
        console.log(p);
        this.form = this.formBuilder.group({
          id: [{ value: this.product$.id, disabled: true }, [Validators.required]],
          title: [{ value: this.product$.title, disabled: true }, [Validators.required]],
          categoryId: [{ value: this.product$.categoryId, disabled: true }, [Validators.required]],
          brand: [{ value: this.product$.brand, disabled: true }, [Validators.required]],
          model: [{ value: this.product$.model, disabled: true }, [Validators.required]],
          price: [{ value: this.product_USD_price, disabled: true }, [Validators.required]],
          actualStock: [{ value: this.product$.actualStock, disabled: true }, [Validators.required]],
          viewStock: [{ value: this.product$.viewStock, disabled: true }, [Validators.required]],
          description: [{ value: this.product$.description, disabled: true }, [Validators.required]],
          isEnabled: [{ value: this.product$.isEnabled, disabled: true }, []],
          isApproved: [{ value: this.product$.isApproved, disabled: true }, []],
          photos: [{ value: [], disabled: true }],
          fieldsJSON: [this.product$.fieldsJSON, []],
          fieldsArray: this.formBuilder.array([]),
        })
        if (this.product$.photos) {
          this.photosToShow = this.product$.photos;
        }
        this.fillFieldsArray();

        // Ajusta la altura del textarea después de inicializar el formulario
        setTimeout(() => {
          this.adjustTextareaHeightForInitialData();
        }, 0);

      });
    }

  }

  adjustTextareaHeightForInitialData(): void {
    const textarea = document.querySelector('textarea[formControlName="description"]') as HTMLTextAreaElement;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    }
  }

  adjustTextareaHeight(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
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


  override send(): void {
    // this method is not used
    return;
  }



}
