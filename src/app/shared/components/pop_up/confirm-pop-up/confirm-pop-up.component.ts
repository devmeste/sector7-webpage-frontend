import { Component, ElementRef, EventEmitter, HostListener, Output, ViewChild, viewChild } from '@angular/core';
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
  @ViewChild('confirmButton') confirmButton!: ElementRef<HTMLButtonElement>;

  confirmAction() {
    this.confirm.emit();
  }
  
  // Ensure focus when the popup opens
  ngAfterViewInit() {
    this.confirmButton.nativeElement.focus();
  }

  @HostListener('document:keydown.enter', ['$event'])
  override handleEnterKey(event: KeyboardEvent) {
    this.confirmAction();
  }

}
