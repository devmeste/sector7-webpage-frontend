import { Component, inject } from '@angular/core';
import { AdminService } from '../../../../../core/services/admin_service/admin.service';
import { ICategory } from '../../../../../core/models/ICategory';
import { AsyncPipe, JsonPipe, NgIf } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { InputDangerTextComponent } from "../../../../../shared/components/inputs/input-danger-text/input-danger-text.component";
import { MessagePopUpComponent } from "../../../../../shared/components/pop_up/message-pop-up/message-pop-up.component";
import { CategoriesUpdatePopUpComponent } from "../categories-update-pop-up/categories-update-pop-up.component";
import { ConfirmPopUpComponent } from "../../../../../shared/components/pop_up/confirm-pop-up/confirm-pop-up.component";



@Component({
  selector: 'app-get-all-categories',
  standalone: true,
  templateUrl: './get-all-categories.component.html',
  styleUrls: ['./get-all-categories.component.scss', "../../../../../shared/styles/admin_table.scss"],
  imports: [AsyncPipe, MatPaginatorModule, MatTableModule, NgIf, JsonPipe, MatIcon, InputDangerTextComponent, MessagePopUpComponent, CategoriesUpdatePopUpComponent, ConfirmPopUpComponent]
})

export class GetAllCategoriesComponent {

  _adminService = inject(AdminService);
  _router = inject(Router);
  categories$!: ICategory[];
  categoryDeletedSuccessfully = false;
  categoryDeletionFailed = false;
  errorMessage: any;

  showUpdatePopUp = false;
  update_id: string = '';


  // Confirm Delete 
  userConfirmDelete = false;
  showPopUpToConfirmDelete = false;
  elementIdToDelete = "";

  ngOnInit(): void {
    this.updateAllCategoriesInView();
  }

  deleteCategory(id: string) {
    this._adminService.deleteCategory(id).subscribe({
      next: () => {
        this.categoryDeletedSuccessfully = true,
        this.updateAllCategoriesInView();
      },
      error: (e) => {
        this.categoryDeletionFailed = true
        this.errorMessage = e.error.message
      },

    });
  }



  closeModal(option: string) {
    switch (option) {
      case "showPopUpToConfirmDelete": this.showPopUpToConfirmDelete = false;
        break;
      case "categoryDeletedSuccessfully": this.categoryDeletedSuccessfully = false;
        break;
      case "categoryDeletionFailed": this.categoryDeletionFailed = false;
        break;
      case "showUpdatePopUp": {
        this.showUpdatePopUp = false;
        this.updateAllCategoriesInView();
      }
        break;
    }
  }


  updateCategory(id: string) {
    this.update_id = id;
    this.showUpdatePopUp = true;
  }


  updateAllCategoriesInView() {
    this._adminService.getAllCategories().subscribe(c => {
      this.categories$ = c;
    })
  }


  askToConfirmDelete(id: string) {
    this.elementIdToDelete = id;
    this.showPopUpToConfirmDelete = true;
  }

  confirmDeleteAction() {
    this.deleteCategory(this.elementIdToDelete);
    this.closeModal("showPopUpToConfirmDelete");
  }

}