import { NgClass } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { InputDangerTextComponent } from '@shared/components/inputs/input-danger-text/input-danger-text.component';
import { AuthService } from 'app/core/services/auth_service/auth.service';
import { CustomForm } from 'app/core/utils/custom-form/custom.form';
import { MessagePopUpComponent } from "../../../shared/components/pop_up/message-pop-up/message-pop-up.component";
import { OneMessageResponse } from 'app/core/models/OneMessageResponse';
import { SpinnerS7Component } from "../../../shared/components/spinners/spinner-s7/spinner-s7.component";

@Component({
  selector: 'app-recover-password',
  standalone: true,
  imports: [NgClass, InputDangerTextComponent, ReactiveFormsModule, MessagePopUpComponent, SpinnerS7Component],
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss', '../../../shared/styles/admin_form.scss']
})
export class RecoverPasswordComponent  extends CustomForm{

  _authService = inject(AuthService);
  showSuccessPopUp: boolean = false;
  showFailedPopUp: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';
  isLoading: boolean = false;

  override initializeForm(): void {
    this.form = this.formBuilder.group({
      user: ['', [Validators.required ]],
      email: ['', [Validators.required , Validators.email]],
    })
  }

  override send(): void {

    if(this.form.valid){
      
      this.isLoading = true;

      const username= this.form.get('user')?.value;
      const email = this.form.get('email')?.value;
      this._authService.recoverPassword(username,email).subscribe({
        next: (response: OneMessageResponse) => {
          this.isLoading = false;

          this.successMessage = response.message;
          this.showSuccessPopUp = true;
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = error.message;
          this.showFailedPopUp = true;
        }
      })
    }
  }
  closeModal(option: string) {
    switch (option) {
      case "showSuccessPopUp": {
        this.form.reset();
        this.showSuccessPopUp = false;
      }
        break;
      case "showFailedPopUp": this.showFailedPopUp = false;
        break;
    }

  }
}