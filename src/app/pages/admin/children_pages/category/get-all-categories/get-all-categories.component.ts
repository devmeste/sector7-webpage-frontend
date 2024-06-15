import { Component, inject } from '@angular/core';
import { AdminService } from '../../../../../core/services/admin_service/admin.service';
import ICategory from '../../../../../core/models/ICategory';
import { AsyncPipe, JsonPipe, NgIf } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { InputDangerTextComponent } from "../../../../../shared/components/inputs/input-danger-text/input-danger-text.component";
import { MessagePopUpComponent } from "../../../../../shared/components/pop_up/message-pop-up/message-pop-up.component";
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


@Component({
    selector: 'app-get-all-categories',
    standalone: true,
    templateUrl: './get-all-categories.component.html',
    styleUrls: ['./get-all-categories.component.scss', "../../admin_table.scss"],
    imports: [AsyncPipe, MatPaginatorModule, MatTableModule, NgIf, JsonPipe, MatIcon, InputDangerTextComponent, MessagePopUpComponent]
})

export class GetAllCategoriesComponent {

  _adminService = inject(AdminService);
  _router = inject(Router);
  categories$!: ICategory[];
  categoryDeletedSuccessfully = false;
  categoryDeletionFailed = false;
  errorMessage: any;

  ngOnInit(): void {
    this._adminService.getAllCategories().subscribe((category_array) => {
      this.categories$ = category_array;
    });
  }

  deleteCategory(id: string) {
    this._adminService.deleteCategory(id).subscribe({
      next: () => {
        this.categoryDeletedSuccessfully = true,
        this._adminService.getAllCategories().subscribe(c => {
          this.categories$ = c;
        })
      },
      error: (e) => {
        this.categoryDeletionFailed = true
        this.errorMessage = e.error.message
      },

    });
  }

  closeModal(option: string) {
    if (option == 'categoryDeletedSuccessfully') {
      this.categoryDeletedSuccessfully = false
    }
    if (option == 'categoryDeletionFailed') {
      this.categoryDeletionFailed = false
    }
  }
}