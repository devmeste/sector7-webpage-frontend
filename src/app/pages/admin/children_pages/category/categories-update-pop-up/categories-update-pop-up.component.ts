import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { InputDangerTextComponent } from '@shared/components/inputs/input-danger-text/input-danger-text.component';
import { MessagePopUpComponent } from '@shared/components/pop_up/message-pop-up/message-pop-up.component';
import { BKICategory, ICategory } from 'app/core/models/ICategory';
import { AdminService } from 'app/core/services/admin_service/admin.service';
import Field from '../../../../../core/models/Field';
import { CustomFormPopUp } from 'app/core/utils/custom-form-pop-up/custom.form.pop.up';


@Component({
  selector: 'app-categories-update-pop-up',
  standalone: true,
  imports: [AsyncPipe, NgIf, NgClass, ReactiveFormsModule, MatIcon, InputDangerTextComponent, MatListModule, MessagePopUpComponent],
  templateUrl: './categories-update-pop-up.component.html',
  styleUrls: ['./categories-update-pop-up.component.scss', '../../../../../shared/styles/pop-up-styles.scss']
})
export class CategoriesUpdatePopUpComponent extends CustomFormPopUp {


  @Input({ required: true }) category_id !: string;

  _adminService = inject(AdminService);
  category$ !: BKICategory;

  categoryUpdatedSuccessfully = false;
  categoryUpdateFailed = false;
  errorMessage = '';

  @ViewChild('inputField') inputField!: ElementRef;

  fields: Field[] = [];

  

  override initializeForm(): void {
    if(this.category_id){
      this._adminService.getCategoryById(this.category_id).subscribe(category => {
        this.category$ = category;
        console.log(this.category$);
  
        this.form = this.formBuilder.group({
          name: [`${this.category$.name}`, [Validators.required]],
          fields: ['', []],
          component: [`${this.category$.component}`, []],
        })
  
        this.fields = category.fields.map(name => ({
          name: name
        }));
  
        console.log(this.fields);
  
      });
    }
   
  }

  ngOnInit(): void {
    this.initializeForm();    
  }



insertNewField($event: Event) {
  $event.preventDefault();
  const newField = this.inputField.nativeElement.value;

  if (newField != '') {

    this.fields.push({ name: newField });
    console.log(this.fields);
    this.inputField.nativeElement.value = '';
  }

}


deleteField(numberField: number) {
  this.fields.splice(numberField, 1);
}



override send() {
  let name = this.form.get('name')?.value;
  let component = this.form.get('component')?.value;
  if (this.fields.length == 0) {
    console.log(this.fields);
  }
  let fields = this.fields;
  let id = this.category_id;

  this._adminService.updateCategory(id, name, component, fields).subscribe
    (
      {
        next: (v) => this.categoryUpdatedSuccessfully = true,

        error: (e) => {
          this.categoryUpdateFailed = true,
            this.errorMessage = e.error.message
        },
      }
    )
}

closePopUpMessage(option: string) {
  switch (option) {
    case "categoryUpdatedSuccessfully": {
      this.categoryUpdatedSuccessfully = false;
      this.closeUpdateModal();
    }
      break;
    case "categoryUpdateFailed": this.categoryUpdateFailed = false;
      break;
  }
}

}
