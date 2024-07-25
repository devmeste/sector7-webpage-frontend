import { FormGroup } from '@angular/forms';
import { ICustomModal } from '../custom-modal/custom-modal';
import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { CustomForm } from '../custom-form/custom.form';


@Component({
    template: ''
})
export abstract class CustomFormPopUp extends CustomForm implements ICustomModal {
    
    @Output() close :EventEmitter<any> = new EventEmitter();

    @HostListener('document:keydown.escape', ['$event'])
    handleEscapeKey(event: KeyboardEvent) {
        this.closeUpdateModal();
    }

    closeUpdateModal() {
        this.close.emit();
    }

}