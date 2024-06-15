import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
@Component({
  selector: 'app-message-pop-up',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle],
  templateUrl: './message-pop-up.component.html',
  styleUrl: './message-pop-up.component.scss'
})
export class MessagePopUpComponent {

  @Output() close = new EventEmitter<any>();

  @Input({ required: true }) custom_message !: string;

  constructor() { }
  
  ngOnInit() { 
    
  }

  closeModal() {
      this.close.emit();
  }

  getMessageLines(): string[] {
    // Dividir el mensaje en líneas usando '\n' como separador
    return this.custom_message.split('\n');
  }
}