import { Component } from '@angular/core';
import { TopButtonReturnComponent } from "../../../../shared/components/top-button-return/top-button-return.component";

@Component({
  selector: 'app-user-password',
  standalone: true,
  imports: [TopButtonReturnComponent],
  templateUrl: './user-password.component.html',
  styleUrl: './user-password.component.scss'
})
export class UserPasswordComponent {
  editPassword() {
    throw new Error('Method not implemented.');
  }

}
