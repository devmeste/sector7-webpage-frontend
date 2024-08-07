import { Component, EventEmitter, HostListener, Input, Output, inject } from '@angular/core';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ICustomModal } from 'app/core/utils/custom-modal/custom-modal';

@Component({
  selector: 'app-message-pop-up',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle],
  templateUrl: './message-pop-up.component.html',
  styleUrls: ['./message-pop-up.component.scss', '../../../styles/pop-up-styles.scss']
})
export class MessagePopUpComponent {

  @Output() close = new EventEmitter<any>();

  @Input({ required: true }) custom_message !: string;

  closeModal() {
    this.close.emit();
  }

  getMessageLines(): string[] {
    // Dividir el mensaje en líneas usando '\n' como separador
    return this.custom_message.split('\n');
  }



  @HostListener('document:keydown.escape', ['$event'])
  handleEscapeKey(event: KeyboardEvent) {
    this.closeModal();
  }
  
  @HostListener('document:keydown.enter', ['$event'])
  handleEnterKey(event: KeyboardEvent) {
    this.closeModal();
  }
}