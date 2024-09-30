import { AsyncPipe, JsonPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild, booleanAttribute, inject, viewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { InputDangerTextComponent } from '@shared/components/inputs/input-danger-text/input-danger-text.component';
import { ICategory } from 'app/core/models/ICategory';
import { AdminService } from 'app/core/services/admin_service/admin.service';
import { MessagePopUpComponent } from "../../../../../shared/components/pop_up/message-pop-up/message-pop-up.component";
import { CustomForm } from 'app/core/utils/custom-form/custom.form';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { ImageUploaderComponent } from "../../../../../shared/components/image-uploader/image-uploader.component";
import { convertNumberArrayToImage } from 'app/core/utils/CustomImageMannager';
import { SpinnerS7Component } from "../../../../../shared/components/spinners/spinner-s7/spinner-s7.component";
@Component({
  selector: 'app-create-product',
  standalone: true,
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss', '../../../../../shared/styles/admin_form.scss'],
  imports: [[NgClass], ReactiveFormsModule, MatIcon, InputDangerTextComponent, MatListModule, JsonPipe, AsyncPipe, NgFor, MessagePopUpComponent, MatSelectModule, ImageUploaderComponent, SpinnerS7Component]
})
export class CreateProductComponent extends CustomForm implements OnInit {


  private _adminService = inject(AdminService);
  @ViewChild('photoInput') photoInput!: ElementRef;
  categories$ !: ICategory[];

  //pop up variables 
  productHasError = false;
  productWasCreatedSuccessfully = false;
  errorMessage = '';

  // Elements that need getted from the backend
  sockets !: string[];
  generations !: string[];
  memory_types !: string[];


  photosByteArray: number[][] = [];
  photosByteArrayString: string[] = [];

  // clear text of image input
  clearFileNameSignal = false;

  //handle the max number of photos
  maxPhotos = 4;
  disableImageInput = false;
  disableText = 'El maximo de fotos permitidas es ' + this.maxPhotos;
  isLoading: boolean = false;


  override initializeForm(): void {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required]],
      id: ['', [Validators.required]],
      brand: ['', [Validators.required]],
      model: ['', [Validators.required]],
      price: ['', [Validators.required]],
      actualStock: ['', [Validators.required]],
      viewStock: ['', [Validators.required]],
      description: ['', []],
      isEnabled: [true, []],
      photos: this.formBuilder.array([], []),
      categoryId: ['', [Validators.required]],
      fieldsJSON: ['', []],
      fieldsArray: this.formBuilder.array([]),
    })
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this._adminService.getAllCategories().subscribe(c => {
      this.categories$ = c;
    });
  }


  get photosArray() {
    return this.form.get('photos') as FormArray;
  }

  get fieldsArray() {
    return this.form.get("fieldsArray") as FormArray;
  }

  onCategoryChange($event: Event) {

    const categoryId = ($event.target as HTMLSelectElement).value;

    if (categoryId == '') {
      return;
    }

    this.form.get('categoryId')?.setValue(categoryId);

    this._adminService.getCategoryById(categoryId).subscribe(category => {

      const ArrayFieldsFromCategory = category.fields;

      this.fieldsArray.clear();
      console.log(ArrayFieldsFromCategory);
      ArrayFieldsFromCategory.forEach(name => {

        if (name.toLowerCase() === 'socket') {
          this._adminService.getAllSockets().subscribe(sockets => {
            this.sockets = sockets.map(socket => socket.type);
            const newFieldGroup = this.createNewFieldGroup(name);
            // Automatically set the first socket value
            if (this.sockets.length > 0) {
              newFieldGroup.get('value')?.setValue(this.sockets[0]); // Set the first value
            }
          })
        }
        else if (name.toLowerCase() === 'generación') {
          this._adminService.getAllGenerations().subscribe(generations => {
            console.log(generations);
            this.generations = generations.map(generation => generation.type);
            const newFieldGroup = this.createNewFieldGroup(name);
            // Automatically set the first generation value
            if (this.generations.length > 0) {
              newFieldGroup.get('value')?.setValue(this.generations[0]); // Set the first value
            }
          })
        }
        else if (name.toLowerCase() === 'tipo de memoria') {
          this._adminService.getAllMemoryTypes().subscribe(memory_types => {
            console.log(memory_types);
            this.memory_types = memory_types.map(memory_type => memory_type.type);
            const newFieldGroup = this.createNewFieldGroup(name);
            // Automatically set the first memory value
            if (this.memory_types.length > 0) {
              newFieldGroup.get('value')?.setValue(this.memory_types[0]); // Set the first value
            }
          })
        }
        else {
          this.createNewFieldGroup(name);
        }
      });
    })

    console.log("this.fieldsArray : " + this.form.value.fieldsArray);
  }

  createNewFieldGroup(name: string): FormGroup<{ fieldName: FormControl<string | null>; value: FormControl<string | null>; }> {
    const newFieldGroup = this.formBuilder.group({
      fieldName: [name, Validators.required],
      value: ['', Validators.required]
    });
    this.fieldsArray.push(newFieldGroup);
    return newFieldGroup;
  }



  deletePhoto(i: number) {
    this.photosByteArray.splice(i, 1);
    this.photosByteArrayString.splice(i, 1);
    if (this.photosByteArray.length == 0) {
      this.clearFileNameSignal = true;
    }
    this.disableImageInput = false;

  }



  override send() {

    this.isLoading = true;

    
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
      description: this.form.get("description")?.value || '',
      isEnabled: this.form.get("isEnabled")?.value,
      fieldsJSON: fields,
      photosByteArray: this.photosByteArray,
    }

    this._adminService.createProduct(newProduct).subscribe({
      next: (v) => {
        this.productWasCreatedSuccessfully = true

        this.photosByteArrayString = [];
        this.photosByteArray = [];
        this.photosArray.clear();
        this.clearFileNameSignal = true;
        this.form.reset();
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.error.message;
        this.productHasError = true;
      }
    });
  }

  addPhoto($event: number[]) {

    this.photosByteArray.push($event);

    const imageUrl = convertNumberArrayToImage($event);

    this.photosByteArrayString.push(imageUrl);

    this.clearFileNameSignal = false;

    if(this.photosByteArray.length == this.maxPhotos){
      this.disableImageInput = true;
    }

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