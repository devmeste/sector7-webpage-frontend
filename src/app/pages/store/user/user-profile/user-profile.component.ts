import { Component } from '@angular/core';
import { TopButtonReturnComponent } from "../../../../shared/components/top-button-return/top-button-return.component";

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [TopButtonReturnComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {

  editPopUpWasOpen = false

  editData() {
    this.editPopUpWasOpen;
    alert("Formulario En desarrollo")
  }

}
