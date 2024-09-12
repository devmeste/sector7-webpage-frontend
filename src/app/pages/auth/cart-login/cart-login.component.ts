import { Component } from '@angular/core';
import { LoginFormComponent } from "../login-form/login-form.component";

@Component({
  selector: 'app-cart-login',
  standalone: true,
  imports: [LoginFormComponent],
  templateUrl: './cart-login.component.html',
  styleUrl: './cart-login.component.scss'
})
export class CartLoginComponent {

}
