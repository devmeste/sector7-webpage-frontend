import { FormGroup } from '@angular/forms';
import { ICustomModal } from '../custom-modal/custom-modal';
import { Component, EventEmitter, HostListener, Output } from '@angular/core';


@Component({
    template: ''
})
export abstract class CustomFormPopUp implements ICustomModal {
    
    
    @Output() close :EventEmitter<any> = new EventEmitter();

    @HostListener('document:keydown.escape', ['$event'])
    handleEscapeKey(event: KeyboardEvent) {
        this.closeUpdateModal();
    }

    closeUpdateModal() {
        this.close.emit();
    }

    hasErrors(form: FormGroup, controlName: string, errorType: string): boolean {
        const control = form.get(controlName);
        if (control) {
            return control.hasError(errorType) && control.touched;
        } else {
            console.log("control not found");
            return false;
        }
    }

    disabledFormButton(form : FormGroup): boolean {
        return form.invalid;
    }

    abstract send() : void



}