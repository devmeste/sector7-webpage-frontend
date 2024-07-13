import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FooterComponent } from "../../../shared/components/footer/footer.component";
import { CustomForm } from 'app/core/utils/custom-form/custom.form';
import { AuthService } from 'app/core/services/auth_service/auth.service';
import { IUser } from 'app/core/models/IUser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  imports: [ReactiveFormsModule, FooterComponent]
})
export class RegisterComponent extends CustomForm {

  _authService = inject(AuthService);
  responseMessage!: string;
  _router: Router = inject(Router);
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
          cellphoneNumber: this.form.get('phone')?.value
        }
      };

      this._authService.register(newUser).subscribe( {

        next: response => {
          console.log("daleee");
          alert(response + "\n \nVerifica tu cuenta y luego podras ingresar");
          // TODO : Mostrar un pop up 
          this.form.reset();

          this._router.navigate(['/'])
        },
        error: err => alert('Ocurrio un error: ' + err.message.message),
        complete: () => console.log('Observable emitted the complete notification')


      } )

    }
  }



}
