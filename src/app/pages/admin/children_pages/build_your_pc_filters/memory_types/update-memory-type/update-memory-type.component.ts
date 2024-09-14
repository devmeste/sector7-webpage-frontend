import { Component } from '@angular/core';
import { UpdateForm } from '../../sockets/sockets-update-pop-up/update-form';
import { Observable } from 'rxjs';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { InputDangerTextComponent } from "../../../../../../shared/components/inputs/input-danger-text/input-danger-text.component";
import { MessagePopUpComponent } from "../../../../../../shared/components/pop_up/message-pop-up/message-pop-up.component";

@Component({
  selector: 'app-update-memory-type',
  standalone: true,
  imports: [NgClass, InputDangerTextComponent, MessagePopUpComponent, ReactiveFormsModule],
  templateUrl: './update-memory-type.component.html',
  styleUrl: './update-memory-type.component.scss'
})
export class UpdateMemoryTypeComponent extends UpdateForm {
  
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
    return this._adminService.getMemoryTypeById(this.element_id);
  }
  override confirmNoNullFields(): boolean {
    return this.form.get('type')?.value !== null && this.form.get('type')?.value !== '';
  }

  override send($event: SubmitEvent): void {
    if (!this.confirmNoNullFields()) {
      console.log("es nulo");
      return;
    }

    const value = this.form.get('type')?.value;
    this._adminService.updateMemoryType(this.element_id, this.form.get('type')?.value).subscribe({
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
