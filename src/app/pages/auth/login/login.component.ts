import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/services/auth_service/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  LoginForm: FormGroup;

  constructor(private auth_service: AuthService) { 
    initializeForm();
    this.LoginForm = new FormGroup({
      username : new FormControl(''),
      password : new FormControl(''),
    })
  }

  login() {
    const {username, password} = this.LoginForm.value;
    // this.auth_service.login(username, password).subscribe({
    this.auth_service.login(username, password).subscribe({
      next: (response) => console.log(response),
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    });
  }
}
function initializeForm() {
    
}

