import { Component } from '@angular/core';
import { ParentLoginComponent } from '../login/parent_login.component';
import { AuthService } from 'app/core/services/auth_service/auth.service';
import { Router, RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, MatIcon],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})

export class LoginFormComponent extends ParentLoginComponent {

  
  constructor(router:Router , auth_service : AuthService){
    super(router, auth_service);
  }
  
   override saveTokenAndRedirect(token:string): void {
    localStorage.setItem('token', token);
    this.router.navigate([`/`]);
  }

  override getSpecialPath(): string {
    return '';
  }
}
