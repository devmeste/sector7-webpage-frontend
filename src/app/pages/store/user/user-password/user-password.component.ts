import { Component } from '@angular/core';
import { TopButtonReturnComponent } from "../../../../shared/components/top-button-return/top-button-return.component";
import { PopUpChangePasswordComponent } from "./pop-up-change-password/pop-up-change-password.component";

@Component({
  selector: 'app-user-password',
  standalone: true,
  imports: [TopButtonReturnComponent, PopUpChangePasswordComponent],
  templateUrl: './user-password.component.html',
  styleUrl: './user-password.component.scss'
})
export class UserPasswordComponent {

  editPopUpWasOpen: boolean = false;

  editPassword() {
    this.editPopUpWasOpen = true;
  }

  closeForm() {
    this.editPopUpWasOpen = false;
  }

}
