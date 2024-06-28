import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  static hasErrors(form : FormGroup , controlName: string, errorType: string) {
    return form.get(controlName)?.hasError(errorType) && form.get(controlName)?.touched
  }
  
}
