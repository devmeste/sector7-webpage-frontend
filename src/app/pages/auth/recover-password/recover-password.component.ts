import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { InputDangerTextComponent } from '@shared/components/inputs/input-danger-text/input-danger-text.component';
import { AuthService } from 'app/core/services/auth_service/auth.service';
import { CustomForm } from 'app/core/utils/custom-form/custom.form';
import { MessagePopUpComponent } from "../../../shared/components/pop_up/message-pop-up/message-pop-up.component";

@Component({
  selector: 'app-recover-password',
  standalone: true,
  imports: [NgClass, InputDangerTextComponent, ReactiveFormsModule, MessagePopUpComponent],
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss', '../../../shared/styles/admin_form.scss']
})
export class RecoverPasswordComponent  extends CustomForm{

  _authService = inject(AuthService);
  showSuccessPopUp: boolean = false;
  showFailedPopUp: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  override initializeForm(): void {
    this.form = this.formBuilder.group({
      user: ['', [Validators.required ]],
      email: ['', [Validators.required , Validators.email]],
    })
  }

  override send(): void {
    if(this.form.valid){
      console.log(this.form.value);
      
      const username= this.form.get('user')?.value;
      const email = this.form.get('email')?.value;

      console.log(username, email);
      this._authService.recoverPassword(username,email).subscribe({
        next: (response) => {
          alert(response);
        },
        error: (error) => {
          this.errorMessage = error.message;
          this.showFailedPopUp = true;
          console.log(error);
        }
      })
    }
  }
  closeModal(option: string) {
    switch (option) {
      case "showSuccessPopUp": {
        this.showSuccessPopUp = false;
      }
        break;
      case "showFailedPopUp": this.showFailedPopUp = false;
        break;
    }

  }
}