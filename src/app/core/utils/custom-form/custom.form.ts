import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

// @Component Just to allow use the ngOnInit
@Component({
    template: ''
})
export abstract class CustomForm  implements OnInit {
    ngOnInit(): void {
        this.initializeForm();
    }

    form !: FormGroup;
    formBuilder: FormBuilder = inject(FormBuilder);
    

    abstract initializeForm() :void;

    hasErrors(form: FormGroup, controlName: string, errorType: string): boolean {
        const control = form.get(controlName);
        if (control) {
            return control.hasError(errorType) && control.touched;
        } else {
            console.log("control not found, error in hasErrors() method");
            return false;
        }
    }

    disabledFormButton(form : FormGroup): boolean {
        return form.invalid;
    }

    abstract send($event : SubmitEvent) : void


}