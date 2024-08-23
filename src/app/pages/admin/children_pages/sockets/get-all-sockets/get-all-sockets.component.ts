import { Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { ISocket } from 'app/core/models/ISocket';
import { AdminService } from 'app/core/services/admin_service/admin.service';
import { SpinnerS7Component } from "../../../../../shared/components/spinners/spinner-s7/spinner-s7.component";
import { InputDangerTextComponent } from "../../../../../shared/components/inputs/input-danger-text/input-danger-text.component";
import { MessagePopUpComponent } from "../../../../../shared/components/pop_up/message-pop-up/message-pop-up.component";
import { ConfirmPopUpComponent } from "../../../../../shared/components/pop_up/confirm-pop-up/confirm-pop-up.component";
import { SocketsUpdatePopUpComponent } from "../sockets-update-pop-up/sockets-update-pop-up.component";

@Component({
  selector: 'app-get-all-sockets',
  standalone: true,
  imports: [MatIcon, SpinnerS7Component, InputDangerTextComponent, MessagePopUpComponent, ConfirmPopUpComponent, SocketsUpdatePopUpComponent],
  templateUrl: './get-all-sockets.component.html',
  styleUrl: './get-all-sockets.component.scss'
})
export class GetAllSocketsComponent {

  socketDeletionFailed: boolean = false;
  errorMessage: boolean = false;
  showPopUpToConfirmDelete: boolean = false;
  showUpdatePopUp: boolean = false;
  socketIdToDelete = "";
  update_id = "";



  _adminService: AdminService = inject(AdminService);
  sockets$ !: ISocket[];
  isLoading: boolean = false;
  socketDeletedSuccessfully: any;


  ngOnInit(): void {
    this.updateSocketsState();
  }

  showUpdatePopUpMethod(id: string
  ) {
    this.showUpdatePopUp = true;
    this.update_id = id;
  }




  updateSocketsState() {
    this.isLoading = true;
    this._adminService.getAllSockets().subscribe(sockets => {
      this.sockets$ = sockets;
      this.isLoading = false;
    })
  };


  askToConfirmDelete(id: string) {
    this.showPopUpToConfirmDelete = true;
    this.socketIdToDelete = id;
  }

  confirmDeleteAction() {
    this.deleteSocket(this.socketIdToDelete);
    this.closeModal("showPopUpToConfirmDelete");
  }

  deleteSocket(id: string) {
    this._adminService.deleteScocket(id).subscribe({
      next: (success) => {
        this.socketDeletedSuccessfully = success
        this.updateSocketsState();
      },
      error: (e) => {
        this.socketDeletionFailed = true
        this.errorMessage = e.error.message
      },
    }
    );
  }

  closeModal(option: string) {
    switch (option) {
      case "socketDeletedSuccessfully": this.socketDeletedSuccessfully = false;
        break;
      case "socketDeletionFailed": this.socketDeletionFailed = false;
        break;
      case "showUpdatePopUp": this.showUpdatePopUp = false;
        break;
      case "showPopUpToConfirmDelete": {
        this.showPopUpToConfirmDelete = false;
        this.socketIdToDelete = "";
      }
        break;
    }
  }


}
