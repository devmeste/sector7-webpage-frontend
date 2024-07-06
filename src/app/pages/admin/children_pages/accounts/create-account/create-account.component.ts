import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomForm } from 'app/core/custom-form/custom.form';
import { AdminService } from 'app/core/services/admin_service/admin.service';
import { InputDangerTextComponent } from "../../../../../shared/components/inputs/input-danger-text/input-danger-text.component";
import { NgClass } from '@angular/common';
import { MessagePopUpComponent } from "../../../../../shared/components/pop_up/message-pop-up/message-pop-up.component";
import { MatIcon } from '@angular/material/icon';
import { timeout } from 'rxjs';
import { IAccountReq } from 'app/core/models/IAccount';

@Component({
  selector: 'app-create-account',
  standalone: true,
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss', '../../../../../shared/styles/admin_form.scss'],
  imports: [InputDangerTextComponent, NgClass, MessagePopUpComponent, ReactiveFormsModule, MatIcon]
})
export class CreateAccountComponent extends CustomForm {



  accountWasCreatedSuccessfully = false;
  accountHasError = false;
  errorMessage = '';
  passwordVisible = 'password';

  private formBuilder = inject(FormBuilder);
  private _adminService = inject(AdminService);

  form: FormGroup = this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
    authorities: ['ROLE_SELLER', []],
  })



  override send(): void {

    const newAccount : IAccountReq = {
      username: this.form.value.username,
      password: this.form.value.password,
      role: this.form.value.authorities
    };
    console.log(newAccount);

    this._adminService.createAccount(this.form.value).subscribe({
      next: () => this.accountWasCreatedSuccessfully = true,
      error: (error) => {
        this.errorMessage = error.error.message;
        this.accountHasError = true;
      }
    })
  }

  closeModal(option: string) {
    switch (option) {
      case 'accountWasCreatedSuccessfully':
        this.accountWasCreatedSuccessfully = false;
        break;
      case 'accountHasError':
        this.accountHasError = false;
        break;
    }
  }

  changePasswordVisibility() {
    if (this.passwordVisible === 'password') {
      this.passwordVisible = 'text';
    } else {
      this.passwordVisible = 'password';
    }
  }

  show() {
    console.log(this.form.valid);
  }


}
