import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { IBanner } from 'app/core/models/IBanner';
import { GetAllGeneric } from 'app/core/utils/get-all-generic/get-all-generic';
import { Observable } from 'rxjs';
import { MessagePopUpComponent } from "../../../../../shared/components/pop_up/message-pop-up/message-pop-up.component";
import { SpinnerS7Component } from "../../../../../shared/components/spinners/spinner-s7/spinner-s7.component";
import { InputDangerTextComponent } from "../../../../../shared/components/inputs/input-danger-text/input-danger-text.component";
import { UpdateBannersComponent } from "../update-banners/update-banners.component";

@Component({
  selector: 'app-get-all-banners',
  standalone: true,
  imports: [MatIcon, MessagePopUpComponent, SpinnerS7Component, InputDangerTextComponent, UpdateBannersComponent],
  templateUrl: './get-all-banners.component.html',
  styleUrl: './get-all-banners.component.scss'
})
export class GetAllBannersComponent extends GetAllGeneric {


  override elements$: IBanner2[] = [];

  override daleteElementById(id: string): Observable<any> {
    throw new Error("Method not implemented. This Method doesn't exists for Banners ");
  }

  override getArrayElementsFromService(): Observable<any> {
    return this._adminService.getAllBanners();
  }

}

export interface IBanner2 {
  id: string;
  title: string;
  category: string;
  date: Date;
  routeUrl: string;
  presignedUrlPc: string;
  presignedUrlTablet: string;
  presignedUrlCellphone: string;
}
