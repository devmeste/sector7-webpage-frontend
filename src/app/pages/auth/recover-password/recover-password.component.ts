import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { InputDangerTextComponent } from '@shared/components/inputs/input-danger-text/input-danger-text.component';
import { AuthService } from 'app/core/services/auth_service/auth.service';
import { CustomForm } from 'app/core/utils/custom-form/custom.form';

@Component({
  selector: 'app-recover-password',
  standalone: true,
  imports: [NgClass, InputDangerTextComponent,ReactiveFormsModule],
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss', '../../../shared/styles/admin_form.scss']
})
export class RecoverPasswordComponent  extends CustomForm{

  _authService = inject(AuthService);

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

      this._authService.recoverPassword(username,email).subscribe({
        next: (response) => {
          alert(response);
        },
        error: (error) => {
          console.log(error);
        }
      })
    }
  }
}