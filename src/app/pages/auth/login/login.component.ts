import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/services/auth_service/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ParentLoginComponent } from './parent_login.component';
import { ITokenDto } from '../../../core/models/ITokenDto';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent extends ParentLoginComponent {

  constructor(router:Router , auth_service : AuthService){
    super(router, auth_service);
  }
  
   override saveTokenAndRedirect(token:string): void {
    localStorage.setItem('token', token);
    this.router.navigate([`/`]);
  }

 
}
