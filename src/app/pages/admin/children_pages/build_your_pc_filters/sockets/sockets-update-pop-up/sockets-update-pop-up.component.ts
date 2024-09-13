import { NgClass } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { ISocket } from 'app/core/models/ISocket';
import { AdminService } from 'app/core/services/admin_service/admin.service';
import { CustomFormPopUp } from 'app/core/utils/custom-form-pop-up/custom.form.pop.up';
import { InputDangerTextComponent } from "../../../../../../shared/components/inputs/input-danger-text/input-danger-text.component";
import { MessagePopUpComponent } from "../../../../../../shared/components/pop_up/message-pop-up/message-pop-up.component";

@Component({
  selector: 'app-sockets-update-pop-up',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, InputDangerTextComponent, MessagePopUpComponent],
  templateUrl: './sockets-update-pop-up.component.html',
  styleUrl: './sockets-update-pop-up.component.scss'
})
export class SocketsUpdatePopUpComponent extends CustomFormPopUp {


  @Input({ required: true }) socket_id !: string;
  @Output() itemWasUpdatedSuccesfully = new EventEmitter();

  private _adminService = inject(AdminService);
  socket$ !: ISocket;

  socketUpdatedSuccessfully = false;
  socketUpdateFailed = false;
  errorMessage = '';

  override initializeForm(): void {
    this._adminService.getSocketById(this.socket_id).subscribe(s => {
      this.socket$ = s;
      this.form = this.formBuilder.group({
        type: [s.type, [Validators.required]],
      })
    }
    )
  }

  

  override send(): void {

    const type = this.form.get('type')?.value;
    if (type === null || type === '') {
      return;
    }

    this._adminService.updateSocket(this.socket_id, type).subscribe(() => {
      this.socketUpdatedSuccessfully = true;
    }, (err: HttpErrorResponse) => {
      this.socketUpdateFailed = true;
      this.errorMessage = err.error.message;
    })
  }


  closeMessageModal(option: string) {
    switch (option) {
      case "socketUpdatedSuccessfully": {
        this.socketUpdatedSuccessfully = false
        this.itemWasUpdatedSuccesfully.emit();
        this.closeUpdateModal();
      };
        break;
      case "socketUpdateFailed": {
        this.socketUpdateFailed = false
      };
        break;
    }
  }
}
