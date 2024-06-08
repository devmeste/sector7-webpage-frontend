import { Component, inject } from '@angular/core';
import { AdminService } from '../../../../../core/services/admin_service/admin.service';
import ICategory from '../../../../../core/models/ICategory';
import { AsyncPipe, JsonPipe, NgIf } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { InputDangerTextComponent } from "../../../../../shared/components/inputs/input-danger-text/input-danger-text.component";
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
    imports: [AsyncPipe, MatPaginatorModule, MatTableModule, NgIf, JsonPipe, MatIcon, InputDangerTextComponent]
})

export class GetAllCategoriesComponent {

  _adminService = inject(AdminService);
  _router = inject(Router);
  categories$!: ICategory[];

  ngOnInit(): void {
    this._adminService.getAllCategories().subscribe((category_array)=>{
      this.categories$ = category_array;
    });
  }

  deleteCategory( id : string){
    console.log(id);
    this._adminService.deleteCategory(id).subscribe(response=>{
      console.log(response);
      this._router.navigate([`/admin-dashboard/category`]);
    });
  }

}