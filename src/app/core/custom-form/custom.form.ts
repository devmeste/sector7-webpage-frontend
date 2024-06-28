import { FormGroup } from '@angular/forms';

export abstract class CustomForm {


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