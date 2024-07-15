import { Component, inject } from '@angular/core';
import { InputDangerTextComponent } from "../../../../../shared/components/inputs/input-danger-text/input-danger-text.component";
import { CurrencyPipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AdminService } from 'app/core/services/admin_service/admin.service';
import { Usd } from 'app/core/models/Usd';
import { CustomDatePipe } from "../../../../../core/pipes/custom-date-pipe.pipe";
import { MessagePopUpComponent } from "../../../../../shared/components/pop_up/message-pop-up/message-pop-up.component";

@Component({
  selector: 'app-get-all-usd',
  standalone: true,
  templateUrl: './get-all-usd.component.html',
  styleUrls: ['./get-all-usd.component.scss', "../../../../../shared/styles/admin_table.scss"],
  imports: [MatPaginatorModule, MatTableModule, MatIcon, CurrencyPipe, InputDangerTextComponent, CustomDatePipe, MessagePopUpComponent]
})

export class GetAllUsdComponent {


  _adminService: AdminService = inject(AdminService);

  usd$!: Usd[];

  showSuccessDeleteMessage: boolean = false;

  ngOnInit(): void {
    this._adminService.getAllUsd().subscribe(u => {
      this.usd$ = u;
    });
  }

  deleteUsd(id: string) {
    this._adminService.deleteUsd(id).subscribe(() => {
      this.showSuccessDeleteMessage = true;
      this.loadAllUsd(); // reload the list of elements after deletion

    })
  }


  loadAllUsd() {
    this._adminService.getAllUsd().subscribe(u => {
      this.usd$ = u;
    });
  }

  closeModal(option: string) {
    switch (option) {
      case "successfulDeletion" : this.showSuccessDeleteMessage = false;
      break;
    }
    
  }
}
