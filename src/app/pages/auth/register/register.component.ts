import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FooterComponent } from "../../../shared/components/footer/footer.component";

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  imports: [ReactiveFormsModule, FooterComponent]
})
export class RegisterComponent {


  registerForm !: FormGroup;
  formBuilder: FormBuilder = inject(FormBuilder);

  constructor() {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required]]
    })
  }


  hasErrors(controlName: string, errorType: string) {
    return this.registerForm.get(controlName)?.hasError(errorType) && this.registerForm.get(controlName)?.touched
  }

  register() {
    alert("To Do: register user when Backend Works!")
  }


}
