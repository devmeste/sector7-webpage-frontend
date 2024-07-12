import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    template: ''
})
export abstract class CustomModal {

    @Output() close = new EventEmitter();

    @HostListener('document:keydown.escape', ['$event'])
    handleEscapeKey(event: KeyboardEvent) {
        this.closeUpdateModal();
    }

    closeUpdateModal() {
        this.close.emit();
    }
}


export interface ICustomModal {
    close: EventEmitter<any>;
    handleEscapeKey(event: KeyboardEvent): void;
    closeUpdateModal(): void;
    
}