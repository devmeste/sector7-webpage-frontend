import { Component, EventEmitter, Output } from '@angular/core';
import { MessagePopUpComponent } from '../message-pop-up/message-pop-up.component';

@Component({
  selector: 'app-confirm-pop-up',
  standalone: true,
  imports: [],
  templateUrl: './confirm-pop-up.component.html',
  styleUrls: ['./confirm-pop-up.component.scss','../../../styles/pop-up-styles.scss']
})
export class ConfirmPopUpComponent extends MessagePopUpComponent {
  
  @Output() confirm = new EventEmitter<any>();

  confirmAction() {
    this.confirm.emit();
  }

}
