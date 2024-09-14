import { NgClass,  } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component,  inject,  } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { InputDangerTextComponent } from '@shared/components/inputs/input-danger-text/input-danger-text.component';
import { MessagePopUpComponent } from '@shared/components/pop_up/message-pop-up/message-pop-up.component';
import { AdminService } from 'app/core/services/admin_service/admin.service';
import { CustomForm } from 'app/core/utils/custom-form/custom.form';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { SpinnerS7Component } from "../../../../../../shared/components/spinners/spinner-s7/spinner-s7.component";
import { CreateForm } from 'app/core/utils/create-form/create-form';

@Component({
  selector: 'app-create-socket',
  standalone: true,
  imports: [NgClass, InputDangerTextComponent, ReactiveFormsModule, MessagePopUpComponent, MatProgressSpinnerModule, SpinnerS7Component],
  templateUrl: './create-socket.component.html',
  styleUrl: './create-socket.component.scss'
})
export class CreateSocketComponent extends CreateForm {

  override elementToCreate: string = 'Socket';




  closeModal(option: string) {

    switch (option) {
      case 'errorCreatingElement': this.errorCreatingElement = false;
        break;
      case 'elementWasCreatedSuccessfully': {
        this.elementWasCreatedSuccessfully = false;
        this.form.reset();
      }
        break;
    }
  }




  override initializeForm(): void {
    this.form = this.formBuilder.group({
      type: ['', [Validators.required]],
    })
  }
  override send($event: SubmitEvent): void {
    this.isLoading = true;
    const { type } = this.form.value;

    this._adminService.createSocket(type).subscribe({
      next: () => {
        this.elementWasCreatedSuccessfully = true;
        this.isLoading = false;
      },
      error: (err: HttpErrorResponse) => {
        this.errorCreatingElement = true;
        this.errorMessage = err.error
        this.isLoading = false;
      }
    })
  }

}
