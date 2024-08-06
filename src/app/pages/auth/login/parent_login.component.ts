import { Injectable } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../../core/services/auth_service/auth.service";
import { ITokenDto } from "../../../core/models/ITokenDto";
import { IErrorResponse } from "app/core/models/IErrorResponse";


@Injectable()
export abstract class ParentLoginComponent {

  LoginForm: FormGroup;
  requestHasError: boolean = false;    
  passwordVisible: string = 'password';

  constructor(protected router:Router, protected auth_service: AuthService) {
    this.LoginForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
    });
  }

  login() {
    const { username, password } = this.LoginForm.value;
    const specialPath = this.getSpecialPath();
    this.auth_service.login(username, password , specialPath).subscribe({
      next: (response) => {
        this.requestHasError = false;
        this.saveTokenAndRedirect(response.token);
      },
      error: (e : IErrorResponse) => {
        this.requestHasError = true;
      },
    });
  }

  abstract getSpecialPath () :string ;

  abstract saveTokenAndRedirect(token: string): void;

  changePasswordVisibility() {
    if (this.passwordVisible === 'password') {
        this.passwordVisible = 'text';
    } else {
        this.passwordVisible = 'password';
    }
}

}