import { NgClass, NgIf } from '@angular/common';
import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { InputDangerTextComponent } from "@shared/components/inputs/input-danger-text/input-danger-text.component";
import { MatListModule } from '@angular/material/list';
import Field from 'app/core/models/Field';
import { AdminService } from 'app/core/services/admin_service/admin.service';
import { MessagePopUpComponent } from "../../../../../shared/components/pop_up/message-pop-up/message-pop-up.component";

@Component({
    selector: 'app-create-category',
    standalone: true,
    templateUrl: './create-category.component.html',
    styleUrl: './create-category.component.scss',
    imports: [NgClass, ReactiveFormsModule, MatIcon, InputDangerTextComponent, MatListModule, MessagePopUpComponent]
})
export class CreateCategoryComponent {

  @ViewChild('inputField') inputField!: ElementRef;

  _adminService = inject(AdminService);

  fields: Field[] = [];


  private formBuilder = inject(FormBuilder);

  form: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    fields: ['', [Validators.required]],
    component: ['', []],
  })
  categoryCreatedSuccessfully: boolean = false;
  categoryCreationFailed: boolean = false;
  errorMessage: string = '';

  insertNewField($event: Event) {
    $event.preventDefault();
    const newField = this.inputField.nativeElement.value;

    if (newField != '' && newField.trim() != '') {
      this.fields.push({ name: newField });
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
    console.log("send");
    let name = this.form.get('name')?.value;
    let component = (this.form.get('component')?.value) ? true : false;
    let fields = this.fields;

    this._adminService.createCategory(name, component, fields).subscribe
      (
        {
          next: (v) => this.categoryCreatedSuccessfully = true,
          error: (e) => {this.categoryCreationFailed = true, 
                        this.errorMessage = e.error.message},
        }
      )
  }

  closeModal(option: string) {
    switch (option) {
      case "categoryCreatedSuccessfully": this.categoryCreatedSuccessfully = false;
        break;
      case "categoryCreationFailed" : this.categoryCreationFailed = false;
        break;
    }
  }
}