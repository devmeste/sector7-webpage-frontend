import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminService } from 'app/core/services/admin_service/admin.service';
import { InputDangerTextComponent } from "../../../../../shared/components/inputs/input-danger-text/input-danger-text.component";
import { MessagePopUpComponent } from "../../../../../shared/components/pop_up/message-pop-up/message-pop-up.component";

@Component({
  selector: 'app-create-usd',
  standalone: true,
  templateUrl: './create-usd.component.html',
  styleUrls: ['./create-usd.component.scss', '../../admin_form.scss'],
  imports: [NgClass, InputDangerTextComponent, ReactiveFormsModule, MessagePopUpComponent]
})
export class CreateUsdComponent {

  _adminService = inject(AdminService);
  showSuccessModal: boolean = false;
  elementWasCreatedSuccessfully: boolean = false;
  thereWasAnErrorWhenCreateElement = false;
  errorMessage = '';


  private formBuilder = inject(FormBuilder);

  form: FormGroup = this.formBuilder.group({
    price: ['', [Validators.required]],
  })

  hasErrors(controlName: string, errorType: string) {
    return this.form.get(controlName)?.hasError(errorType) && this.form.get(controlName)?.touched
  }


  disabledFormButton(): boolean {
    return this.form.invalid;
  }


  send() {
    let price = this.form.get('price')?.value;

    this._adminService.createUsd(price).subscribe({
      next: () => {
        this.form.reset();
        this.elementWasCreatedSuccessfully = true;
      },
      error: (error) => {
        this.thereWasAnErrorWhenCreateElement = true;
        this.errorMessage = error.error.message;
      }
    });

  }


  closeModal(option: string) {
    switch (option) {
      case "elementWasCreatedSuccessfully": this.elementWasCreatedSuccessfully = false;
        break;
      case "thereWasAnErrorWhenCreateElement": this.thereWasAnErrorWhenCreateElement = false;
        break;
    }
  }
}


