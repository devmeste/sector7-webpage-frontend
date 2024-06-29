import { Component, EventEmitter, HostListener, Input, Output, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import BKProduct from 'app/core/models/BKProduct';
import { ICategory } from 'app/core/models/ICategory';
import { AdminService } from 'app/core/services/admin_service/admin.service';
import { InputDangerTextComponent } from "../../../../../shared/components/inputs/input-danger-text/input-danger-text.component";
import { CustomForm } from 'app/core/custom-form/custom.form';
import { NgClass, NgFor } from '@angular/common';
import { MessagePopUpComponent } from "../../../../../shared/components/pop_up/message-pop-up/message-pop-up.component";
@Component({
  selector: 'app-products-update-pop-up',
  standalone: true,
  templateUrl: './products-update-pop-up.component.html',
  styleUrls: ['./products-update-pop-up.component.scss', '../../../../../shared/styles/pop-up-styles.scss', '../../../../../shared/styles/admin_form.scss'],
  imports: [InputDangerTextComponent, NgClass, MessagePopUpComponent, ReactiveFormsModule, NgFor]
})
export class ProductsUpdatePopUpComponent extends CustomForm {


  @Output() close = new EventEmitter();
  @Input({ required: true }) product_id !: string;
  @Input({ required: true }) product_USD_price !: number;

  private formBuilder = inject(FormBuilder);
  private _adminService = inject(AdminService);

  product$ !: BKProduct;
  private photos = [];

  productUpdatedSuccessfully = false;
  productUpdateFailed = false;
  errorMessage = '';

  photosArray: string[]=[];
  photosToShow: string[] = [];


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
        photos: [],
        fieldsJSON: [this.product$.fieldsJSON, []],
        fieldsArray: this.formBuilder.array([]),
      })
      if(this.product$.photos){
        this.photosToShow = this.product$.photos;
      }
      this.fillFieldsArray();
    });
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

    let fieldsJSON: string = '{\"';

    let a: any = {};

    (this.form.get('fieldsArray')?.value as Field[]).forEach((field: Field) => {
      fieldsJSON += `${field.fieldName}\":\"${field.value}\","`;
      a[field.fieldName] = field.value;
    });

    // console.log(a);
    fieldsJSON = fieldsJSON.slice(0, -2); // Elimina la coma sobrante al final;

    fieldsJSON += `}`;

    let hola = JSON.stringify(a);

    // console.log("fieldJson: ");
    // console.log(fieldsJSON);

    // console.log("Hola: ");
    // console.log(hola);

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
      photos : this.photosArray,
      isEnabled: this.form.get("isEnabled")?.value,
      fieldsJSON: hola
    }


    this._adminService.updateProduct(p).subscribe({
      next: (v) => { this.productUpdatedSuccessfully = true },

      error: (error) => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.productUpdateFailed = true;
      }
    });
  }

  closeUpdateModal() {
    this.close.emit();
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

  @HostListener('document:keydown.escape', ['$event'])
  handleEscapeKey(event: KeyboardEvent) {
    this.closeUpdateModal();
  }


  keyPress() {
    
    let photo  = this.form.get("photos")?.value;
    this.photosArray.push(photo);
    this.form.get('photos')?.reset();
    // $event.preventDefault();
    // if( $event.key === "Enter") {

    // }
  }
}




interface Field {
  fieldName: string;
  value: string;
}
