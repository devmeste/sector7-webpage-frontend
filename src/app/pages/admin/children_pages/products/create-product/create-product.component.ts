import { AsyncPipe, JsonPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild, booleanAttribute, inject, viewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { InputDangerTextComponent } from '@shared/components/inputs/input-danger-text/input-danger-text.component';
import { ICategory } from 'app/core/models/ICategory';
import { AdminService } from 'app/core/services/admin_service/admin.service';
import { MessagePopUpComponent } from "../../../../../shared/components/pop_up/message-pop-up/message-pop-up.component";
import { CustomForm } from 'app/core/utils/custom-form/custom.form';
@Component({
  selector: 'app-create-product',
  standalone: true,
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss', '../../../../../shared/styles/admin_form.scss'],
  imports: [[NgClass], ReactiveFormsModule, MatIcon, InputDangerTextComponent, MatListModule, JsonPipe, AsyncPipe, NgFor, MessagePopUpComponent]
})
export class CreateProductComponent extends CustomForm implements OnInit {

  override initializeForm(): void {
    this.form = this.formBuilder.group({
      title: ['asdasd', [Validators.required]],
      id: [this.generateRandomString(10), [Validators.required]],
      brand: ['aaa', [Validators.required]],
      model: ['aaa', [Validators.required]],
      price: ['100', [Validators.required]],
      actualStock: ['1234', [Validators.required]],
      viewStock: ['1002', [Validators.required]],
      description: ['asdasd', [Validators.required]],
      isEnabled: [true, []],
      photos: this.formBuilder.array(['https://github.com/JesusDiazDeveloper/sector_7_imgs/blob/main/teclado/teclado.png?raw=true'], []),
      categoryId: ['', [Validators.required]],
      fieldsJSON: ['', []],
      fieldsArray: this.formBuilder.array([]),
    })
  }
  // Para Produccion
  // override initializeForm(): void {
  //   this.form = this.formBuilder.group({
  //     title: ['asdasd', [Validators.required]],
  //     id: [this.generateRandomString(10), [Validators.required]],
  //     brand: ['aaa', [Validators.required]],
  //     model: ['aaa', [Validators.required]],
  //     price: ['100', [Validators.required]],
  //     actualStock: ['1234', [Validators.required]],
  //     viewStock: ['1002', [Validators.required]],
  //     description: ['asdasd', [Validators.required]],
  //     isEnabled: [true, []],
  //     photos: this.formBuilder.array(['https://github.com/JesusDiazDeveloper/sector_7_imgs/blob/main/teclado/teclado.png?raw=true'], []),
  //     categoryId: ['', [Validators.required]],
  //     fieldsJSON: ['', []],
  //     fieldsArray: this.formBuilder.array([]),
  //   })
  // }

  categories$ !: ICategory[];
  productWasCreatedSuccessfully = false;
  productHasError = false;
  errorMessage = '';
  @ViewChild('photoInput') photoInput!: ElementRef;
  private _adminService = inject(AdminService);



  // Recordar poner isEnabled en true!!       isEnabled: [false, []],

  // luego borrar este metodo
  generateRandomString(length: number = 10): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }


  override ngOnInit(): void {
    super.ngOnInit();
    this._adminService.getAllCategories().subscribe(c => {
      this.categories$ = c;
    });
  }

  ngAfterViewInit(): void {
    this.photoInput.nativeElement.value = '';
  }


  get photosArray() {
    return this.form.get('photos') as FormArray;
  }

  get fieldsArray() {
    return this.form.get("fieldsArray") as FormArray;
  }


  // VOY POR ACA
  onCategoryChange($event: Event) {

    const selectElement = $event.target as HTMLSelectElement;

    const categoryId = selectElement.value;

    if (categoryId == '') {
      return;
    }

    this.form.get('categoryId')?.setValue(categoryId);

    this._adminService.getCategoryById(categoryId).subscribe(category => {

      const ArrayFieldsFromCategory = category.fields;

      this.fieldsArray.clear();

      ArrayFieldsFromCategory.forEach(name => {
        const newFieldGroup = this.formBuilder.group({
          fieldName: [name, Validators.required],
          value: ['', Validators.required]
        });
        this.fieldsArray.push(newFieldGroup);
      });
    })
  }

  addPhoto() {
    // Todo este metodo volver
    const p = this.photoInput.nativeElement.value;
    if (p.trim().length == 0 || p == null) {
      return;
    }
    this.photosArray.push(this.formBuilder.control(p, []));
    this.photoInput.nativeElement.value = '';
  }

  deletePhoto(i: number) {
    this.photosArray.removeAt(i);
  }

  override send() {
    let fields: any = {};
    (this.form.get('fieldsArray')?.value as Field[]).forEach((field: Field) => {
      fields[field.fieldName] = field.value;
    });

    fields = JSON.stringify(fields);

    const newProduct: any = {
      id: this.form.get("id")?.value,
      categoryId: this.form.get("categoryId")?.value,
      brand: this.form.get("brand")?.value,
      model: this.form.get("model")?.value,
      price: parseFloat(this.form.get("price")?.value),
      actualStock: parseInt(this.form.get("actualStock")?.value),
      viewStock: parseInt(this.form.get("viewStock")?.value),
      title: this.form.get("title")?.value,
      description: this.form.get("description")?.value,
      isEnabled: this.form.get("isEnabled")?.value,
      photos: this.photosArray.value,
      fieldsJSON: fields
    }

    this._adminService.createProduct(newProduct).subscribe({
      next: (v) => {
        this.productWasCreatedSuccessfully = true
        this.form.reset();
      },
      error: (error) => {
        this.errorMessage = error.error.message;
        this.productHasError = true;
      }
    });
  }



  closeModal(option: string) {
    switch (option) {
      case "productWasCreatedSuccessfully": this.productWasCreatedSuccessfully = false;
        break;
      case "productHasError": this.productHasError = false;
        break;
    }
  }
}

interface Field {
  fieldName: string;
  value: string;
}