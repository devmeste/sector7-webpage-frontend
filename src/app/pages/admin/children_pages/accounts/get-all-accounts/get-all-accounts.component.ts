import { Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { MessagePopUpComponent } from '@shared/components/pop_up/message-pop-up/message-pop-up.component';
import { IAccount } from 'app/core/models/IAccount';
import { AdminService } from 'app/core/services/admin_service/admin.service';
import { InputDangerTextComponent } from "../../../../../shared/components/inputs/input-danger-text/input-danger-text.component";

@Component({
  selector: 'app-get-all-accounts',
  standalone: true,
  templateUrl: './get-all-accounts.component.html',
  styleUrls: ['./get-all-accounts.component.scss', "../../../../../shared/styles/admin_table.scss"],
  imports: [MatPaginatorModule, MatTableModule, MatIcon, MessagePopUpComponent, InputDangerTextComponent]
})
export class GetAllAccountsComponent {

  _adminService = inject(AdminService);
  _router = inject(Router);

  accountUpdatedSuccessfully = false;
  accountDeletedSuccessfully = false;
  accountUpdatedFailed = false;
  accountDeletedFailed = false;
  wasEnabled!: boolean;
  errorMessage: any;

  showUpdatePopUp = false;
  update_id: string = '';

  accounts$!: IAccount[];

  ngOnInit(): void {
    this.updateAllAccountsInView();
  }

  updateAllAccountsInView() {
    this._adminService.getAllAccounts().subscribe(a => {
      this.accounts$ = a;
    })
  }

  closeModal(option: string) {

    switch (option) {
      case "accountUpdatedSuccessfully": this.accountUpdatedSuccessfully = false;
        break;
      case "accountDeletedSuccessfully": this.accountDeletedSuccessfully = false;
        break;
      case "accountUpdatedFailed": this.accountUpdatedFailed = false;
        break;
      case "accountDeletedFailed": this.accountDeletedFailed = false;
        break;
    }
  }

  updateStateAccount( username: string, change: boolean) {
    
    this._adminService.changeStateAccount(username, change).subscribe({
      next: () => {
        this.wasEnabled = change;
        this.accountUpdatedSuccessfully = true;
        this.updateAllAccountsInView();
      },
      error: (e) => {
        this.accountUpdatedFailed = true;
        this.errorMessage = e.error.message;
      }
    })
  }

  deleteAccount(username: string){
    this._adminService.deleteAccount(username).subscribe({
      next: () => {
        this.accountDeletedSuccessfully = true;
        this.updateAllAccountsInView();
      },
      error: (e) => {
        this.accountDeletedFailed = true;
        this.errorMessage = e.error.message;
      }
    })
  }
}
