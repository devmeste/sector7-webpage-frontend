import { Injectable } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../../core/services/auth_service/auth.service";
import { ITokenDto } from "../../../core/models/ITokenDto";


@Injectable()
export abstract class ParentLoginComponent {

  LoginForm: FormGroup;
  requestHasError: boolean = false;
  
  constructor(protected router:Router, protected auth_service: AuthService) {

    this.LoginForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
    });
  }

  login(specialCase ?: string) {
    const { username, password } = this.LoginForm.value;
    
    this.auth_service.login(username, password , specialCase).subscribe({
      next: (response) => {
        this.requestHasError = false;
        const token = response.token;
        this.saveTokenAndRedirect(token);
      },
      error: () => this.requestHasError = true,
      complete: () => {
        console.info('complete');
      },
    });
  }

  abstract saveTokenAndRedirect(token: string): void;

}