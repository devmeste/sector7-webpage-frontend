import { Component } from '@angular/core';
import { SocketsUpdatePopUpComponent } from '../../sockets/sockets-update-pop-up/sockets-update-pop-up.component';
import { ConfirmPopUpComponent } from '@shared/components/pop_up/confirm-pop-up/confirm-pop-up.component';
import { MessagePopUpComponent } from '@shared/components/pop_up/message-pop-up/message-pop-up.component';
import { InputDangerTextComponent } from '@shared/components/inputs/input-danger-text/input-danger-text.component';
import { SpinnerS7Component } from '@shared/components/spinners/spinner-s7/spinner-s7.component';
import { MatIcon } from '@angular/material/icon';
import { Observable, Observer, Subscription } from 'rxjs';
import { GetAllGeneric } from 'app/core/utils/get-all-generic/get-all-generic';
import { UpdateGenerationComponent } from "../update-generation/update-generation.component";

@Component({
  selector: 'app-get-all-generations',
  standalone: true,
  imports: [MatIcon, SpinnerS7Component, InputDangerTextComponent, MessagePopUpComponent, ConfirmPopUpComponent, SocketsUpdatePopUpComponent, UpdateGenerationComponent],
  templateUrl: './get-all-generations.component.html',
  styleUrl: './get-all-generations.component.scss'
})
export class GetAllGenerationsComponent extends GetAllGeneric {

  override elements$: any[] = [];

  override updateElementsState(): void {
    this.isLoading = true;
    this.getArrayElementsFromService().subscribe(elements => {
      this.elements$ = elements;
      this.isLoading = false;
    })
  }

  override getArrayElementsFromService(): Observable<any> {
    return this._adminService.getAllGenerations();
  }


  
  override daleteElementById(id: string): Observable<any> {
    return this._adminService.deleteGeneration(id);
  }
 


}
