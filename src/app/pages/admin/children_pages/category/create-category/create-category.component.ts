import { NgClass, NgIf } from '@angular/common';
import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { InputDangerTextComponent } from "@shared/components/inputs/input-danger-text/input-danger-text.component";
import { MatListModule } from '@angular/material/list';
import Field from 'app/core/models/Field';
import { AdminService } from 'app/core/services/admin_service/admin.service';

@Component({
  selector: 'app-create-category',
  standalone: true,
  templateUrl: './create-category.component.html',
  styleUrl: './create-category.component.scss',
  imports: [NgClass, ReactiveFormsModule, NgIf, MatIcon, InputDangerTextComponent, MatListModule]
})
export class CreateCategoryComponent {

  @ViewChild ('inputField') inputField!: ElementRef; 

  _adminService = inject(AdminService);

  fields: Field[] = [];

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  private formBuilder = inject(FormBuilder);

  form: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    fields : ['', [Validators.required]],
    component: ['', []]
  })

  insertNewField($event: Event) {
    $event.preventDefault();
    const newField = this.inputField.nativeElement.value;

    if(newField != '') {
      this.fields.push({ name: newField});

      this.inputField.nativeElement.value = ''; 
    }

  }
  hasErrors(controlName: string, errorType: string) {
    return this.form.get(controlName)?.hasError(errorType) && this.form.get(controlName)?.touched
  }

  deleteField(numberField: number) {
    this.fields.splice(numberField, 1);
  }


  disabledFormButton(): boolean {
    return this.form.invalid || this.fields.length == 0;
  }


  send() {
    let name = this.form.get('name')?.value;
    let component = (this.form.get('component')?.value ) ? true : false;
    let fields = this.fields;

    this._adminService.createCategory(name, component, fields);
  }
}  
