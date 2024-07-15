import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomForm } from 'app/core/utils/custom-form/custom.form';
import { InputDangerTextComponent } from "../../../shared/components/inputs/input-danger-text/input-danger-text.component";
import { AuthService } from 'app/core/services/auth_service/auth.service';
import { MessagePopUpComponent } from "../../../shared/components/pop_up/message-pop-up/message-pop-up.component";
@Component({
  selector: 'app-recover-user',
  standalone: true,
  imports: [NgClass, InputDangerTextComponent, ReactiveFormsModule, MessagePopUpComponent],
  templateUrl: './recover-user.component.html',
  styleUrls: ['./recover-user.component.scss', '../../../shared/styles/admin_form.scss']
})

export class RecoverUserComponent extends CustomForm {

  _authService = inject(AuthService);
  showSuccessPopUp: boolean = false;
  showFailedPopUp: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  override initializeForm(): void {
    this.form = this.formBuilder.group({
      email_or_phone: ['', [Validators.required, Validators.email]]
    })
  }

  override send(): void {
    if (this.form.valid) {
      console.log(this.form.value);
      const emailOrPhone = this.form.get('email_or_phone')?.value;

      this._authService.recoverUser(emailOrPhone).subscribe({
        next: response => {
          console.log(response);
          this.successMessage = response; 
          this.showSuccessPopUp = true;
          this.form.reset();
        },
        error: err => {
          this.showFailedPopUp = true;
          console.log(err);
          this.errorMessage = err.error.message;
        },
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
