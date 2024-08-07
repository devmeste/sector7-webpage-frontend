import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomFormPopUp } from 'app/core/utils/custom-form-pop-up/custom.form.pop.up';
import { InputDangerTextComponent } from "../../../../../shared/components/inputs/input-danger-text/input-danger-text.component";
import { AuthService, ChangePasswordSuccessDTO } from 'app/core/services/auth_service/auth.service';
import { MessagePopUpComponent } from "../../../../../shared/components/pop_up/message-pop-up/message-pop-up.component";

@Component({
  selector: 'app-pop-up-change-password',
  standalone: true,
  imports: [NgClass, ReactiveFormsModule, InputDangerTextComponent, MessagePopUpComponent],
  templateUrl: './pop-up-change-password.component.html',
  styleUrl: './pop-up-change-password.component.scss'
})
export class PopUpChangePasswordComponent extends CustomFormPopUp {


  _authService: AuthService = inject(AuthService);
  successMessage!: string;
  passwordWasChangedSuccessfully: boolean = false;
  errorMessage: string = '';
  thereWasAnError: boolean = false;

 

  override initializeForm(): void {
    this.form = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      validationPassword: ['', Validators.required],
    });
  }

  override send($event: SubmitEvent): void {
    console.log(this.form.value);
    const { oldPassword, newPassword, validationPassword } = this.form.value;
    let body = {
      oldPassword,
      newPassword,
      validationPassword
    }
    this._authService.change_user_password(body).subscribe({
      next: (response) => {
        this.passwordWasChangedSuccessfully = true;
        this.successMessage = response.message;
        console.log(this.successMessage);
      },
      error: (e) => {
        this.thereWasAnError = true;
        this.errorMessage = e.error.message;
        console.log(this.errorMessage);
      }
    })
  }

  closeModal(option: string) {
    switch (option) {
      case "thereWasAnError": this.thereWasAnError = false;
        break;
      case "passwordWasChangedSuccessfully": {
        this.passwordWasChangedSuccessfully = false;
        this.closeUpdateModal()
      }
        break;
    }
  }

}
