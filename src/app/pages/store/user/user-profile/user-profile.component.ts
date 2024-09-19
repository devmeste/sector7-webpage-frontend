import { Component, inject } from '@angular/core';
import { TopButtonReturnComponent } from "../../../../shared/components/top-button-return/top-button-return.component";
import { UserUpdatePopUpComponent } from "./user-update-pop-up/user-update-pop-up.component";
import { AuthService } from 'app/core/services/auth_service/auth.service';
import { UserData } from 'app/core/models/IUser';
import { IUserResponse } from 'app/core/models/IUserResponse';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [TopButtonReturnComponent, UserUpdatePopUpComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {


  _authService = inject(AuthService)
  user !: IUserResponse ;

  editPopUpWasOpen = false;

  constructor() { 
    this.updateUserState();
  }

  updateUserState(){
    this._authService.getUser().subscribe(user => {
      this.user = user;
    })
  }

  editData() {
    this.editPopUpWasOpen = true;
  }

  closePopUp( option : string){
    console.log("User Profile .. ");
      switch (option) {
        case 'editPopUpWasOpen': this.editPopUpWasOpen = false; 
        break;
      } 
  }

}
