import { Component } from '@angular/core';
import { GetAllGeneric } from 'app/core/utils/get-all-generic/get-all-generic';
import { Observable } from 'rxjs';
import { MessagePopUpComponent } from "../../../../../../shared/components/pop_up/message-pop-up/message-pop-up.component";
import { ConfirmPopUpComponent } from "../../../../../../shared/components/pop_up/confirm-pop-up/confirm-pop-up.component";
import { InputDangerTextComponent } from "../../../../../../shared/components/inputs/input-danger-text/input-danger-text.component";
import { SpinnerS7Component } from "../../../../../../shared/components/spinners/spinner-s7/spinner-s7.component";
import { MatIcon } from '@angular/material/icon';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-get-all-memory-types',
  standalone: true,
  imports: [MessagePopUpComponent, ConfirmPopUpComponent, InputDangerTextComponent, SpinnerS7Component, MatIcon],
  templateUrl: './get-all-memory-types.component.html',
  styleUrl: './get-all-memory-types.component.scss'
})
export class GetAllMemoryTypesComponent extends GetAllGeneric{
  

  override elements$: any[] = [];

  override daleteElementById(id: string): Observable<any> {
    return this._adminService.deleteMemoryType(id);
  }

  override getArrayElementsFromService(): Observable<any> {
    return this._adminService.getAllMemoryTypes();
  }

}
