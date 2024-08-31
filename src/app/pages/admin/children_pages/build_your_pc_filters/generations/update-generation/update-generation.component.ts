import { Component } from '@angular/core';
import { UpdateForm } from '../../sockets/sockets-update-pop-up/update-form';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { InputDangerTextComponent } from "../../../../../../shared/components/inputs/input-danger-text/input-danger-text.component";
import { MessagePopUpComponent } from "../../../../../../shared/components/pop_up/message-pop-up/message-pop-up.component";
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-update-generation',
  standalone: true,
  imports: [InputDangerTextComponent, MessagePopUpComponent, NgClass, ReactiveFormsModule],
  templateUrl: './update-generation.component.html',
  styleUrl: './update-generation.component.scss'
})
export class UpdateGenerationComponent extends UpdateForm {


  override element$: any;

  override initializeForm(): void {
    this.getElementToUpdate().subscribe(s => {
      this.element$ = s;
      this.form = this.formBuilder.group({
        type: [s.type, [Validators.required]],
      })
      console.log(this.form);
    })
  }

  override getElementToUpdate(): Observable<any> {
    return this._adminService.getGenerationById(this.element_id);
  }
  override confirmNoNullFields(): boolean {
    return this.form.get('type')?.value !== null && this.form.get('type')?.value !== '';
  }

  override send($event: SubmitEvent): void {
    if (!this.confirmNoNullFields()) {
      return;
    }

    const value = this.form.get('type')?.value;
    this._adminService.updateGeneration(this.element_id, this.form.get('type')?.value).subscribe({
      next: () => {
        this.elementUpdatedSuccessfully = true;
      },
      error: (err: HttpErrorResponse) => {
        this.elementUpdateFailed = true;
        this.errorMessage = err.error.message;
      }
    })
  }


}
