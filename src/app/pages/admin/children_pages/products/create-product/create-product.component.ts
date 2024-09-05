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
@Component({
  selector: 'app-create-product',
  standalone: true,
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss', '../../../../../shared/styles/admin_form.scss'],
  imports: [[NgClass], ReactiveFormsModule, MatIcon, InputDangerTextComponent, MatListModule, JsonPipe, AsyncPipe, NgFor, MessagePopUpComponent, MatSelectModule, ImageUploaderComponent]
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


  photosByteArray: number[][]= [];
  photosByteArrayString: string[] = [];




  override initializeForm(): void {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required]],
      id: ['', [Validators.required]],
      brand: ['', [Validators.required]],
      model: ['', [Validators.required]],
      price: ['', [Validators.required]],
      actualStock: ['', [Validators.required]],
      viewStock: ['', [Validators.required]],
      description: ['', [Validators.required]],
      isEnabled: [true, []],
      photos: this.formBuilder.array([], []),
      categoryId: ['', [Validators.required]],
      fieldsJSON: ['', []],
      fieldsArray: this.formBuilder.array([]),
    })
  }

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
    // this.photoInput.nativeElement.value = '';
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
        else if(name.toLowerCase() === 'generación'){
          this._adminService.getAllGenerations().subscribe(generations => {
            console.log(generations);
            this.generations = generations.map( generation => generation.type);
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

    console.log( "this.fieldsArray : " +  this.form.value.fieldsArray);
  }

  createNewFieldGroup(name: string): FormGroup<{ fieldName: FormControl<string | null>; value: FormControl<string | null>; }> {
    const newFieldGroup = this.formBuilder.group({
      fieldName: [name, Validators.required],
      value: ['', Validators.required]
    });
    this.fieldsArray.push(newFieldGroup);
    return newFieldGroup;
  }



  addPhoto() {
    // Todo este metodo volver
    // const p = this.photoInput.nativeElement.value;
    // if (p.trim().length == 0 || p == null) {
    //   return;
    // }
    // this.photosArray.push(this.formBuilder.control(p, []));
    // this.photoInput.nativeElement.value = '';
  }

  deletePhoto(i: number) {
    this.photosByteArray.splice(i, 1);
    this.photosByteArrayString.splice(i, 1);
  }


  // convertToBase64(){
  //   return this.photosByteArray.map((photo) => {
  //     const binaryString = String.fromCharCode(...photo);
  //     return btoa(binaryString);
  //   });
  // }   

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
      fieldsJSON: fields,
      photosByteArray: this.photosByteArray,
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

  onFileUploaded($event: number[]) {

    this.photosByteArray.push($event);

    const imageUrl = convertNumberArrayToImage($event);
    
    this.photosByteArrayString.push(imageUrl);

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