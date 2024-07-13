import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomForm } from 'app/core/utils/custom-form/custom.form';
import { InputDangerTextComponent } from "../../../shared/components/inputs/input-danger-text/input-danger-text.component";
import { AuthService } from 'app/core/services/auth_service/auth.service';
@Component({
  selector: 'app-recover-user',
  standalone: true,
  imports: [NgClass, InputDangerTextComponent,ReactiveFormsModule],
  templateUrl: './recover-user.component.html',
  styleUrls: ['./recover-user.component.scss', '../../../shared/styles/admin_form.scss']
})

export class RecoverUserComponent extends CustomForm{

  _authService = inject(AuthService);

  override initializeForm(): void {
    this.form = this.formBuilder.group({
      email_or_phone: ['', [Validators.required , Validators.email]]
    })
  }

  override send(): void {
    if(this.form.valid){
      console.log(this.form.value);
      const emailOrPhone = this.form.get('email_or_phone')?.value;
      this._authService.recoverUser(emailOrPhone).subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (error) => {
          console.log(error);
        }
      })
    }
  }

}
