import {  Component, inject } from '@angular/core';
import {ReactiveFormsModule, Validators } from '@angular/forms';
import { FooterComponent } from "../../../shared/components/footer/footer.component";
import { CustomForm } from 'app/core/utils/custom-form/custom.form';
import { AuthService } from 'app/core/services/auth_service/auth.service';
import { IUser } from 'app/core/models/IUser';
import { Router } from '@angular/router';
import { MessagePopUpComponent } from "../../../shared/components/pop_up/message-pop-up/message-pop-up.component";

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  imports: [ReactiveFormsModule, FooterComponent, MessagePopUpComponent]
})
export class RegisterComponent extends CustomForm {

  _authService = inject(AuthService);
  responseMessage!: string;
  _router: Router = inject(Router);
  showSuccessPopUp: boolean = false;
  showFailedPopUp: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';



  constructor() {
    super();
  }



  override initializeForm(): void {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      area_Code: ['', Validators.required],
      phone: ['', Validators.required]
    });
  }



  override send(): void {

    if (this.form.valid) {
      const newUser: IUser = {
        username: this.form.get('username')?.value,
        password: this.form.get('password')?.value,
        userData: {
          firstname: this.form.get('name')?.value,
          lastname: this.form.get('lastname')?.value,
          email: this.form.get('email')?.value,
          areaCode: this.form.get('area_Code')?.value,
          cellphoneNumber: this.form.get('phone')?.value,
          photo: []
        }
      };

      this._authService.register(newUser).subscribe({
        next: response => {
          let res = JSON.parse(response);
          this.successMessage = res.message + "\n \nVerifica tu cuenta y luego podrás ingresar";
          // TODO : Mostrar un pop up
          this.showSuccessPopUp = true;
          this.form.reset();

        },
        error: err => {
          this.showFailedPopUp = true;
          this.errorMessage = JSON.parse(err.error).message;
          console.log(JSON.parse(err.error).message); // TODO: Cambiar cuando el meste lo haya cambiado
        },


      })

    }
  }

  closeModal(option: string) {
    switch (option) {
      case "showSuccessPopUp": {
        this.showSuccessPopUp = false;
        this._router.navigate(['/']);
      }
        break;
      case "showFailedPopUp": this.showFailedPopUp = false;
        break;
    }

  }


}
