import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { Address } from 'app/core/models/IMakePurchase';
import { CustomFormPopUp } from 'app/core/utils/custom-form-pop-up/custom.form.pop.up';
import { InputDangerTextComponent } from "../../../../shared/components/inputs/input-danger-text/input-danger-text.component";
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-fill-address-pop-up',
  standalone: true,
  imports: [ReactiveFormsModule, InputDangerTextComponent,NgClass],
  templateUrl: './fill-address-pop-up.component.html',
  styleUrl: './fill-address-pop-up.component.scss'
})


export class FillAddressPopUpComponent extends CustomFormPopUp{
 
  @Input() address :Address | null = null;
  @Output() formFilledEvent : EventEmitter<Address> = new EventEmitter();
  addressFillOutByUser : Address | null = null;

  override initializeForm(): void {
    this.address ? this.initializeFormFilled() : this.initializeFormEmpty(); 
  }

  initializeFormFilled() {
    this.form = this.formBuilder.group({
      zipCode : [this.address?.zipCode , Validators.required],
      province : [this.address?.province , Validators.required],
      city : [this.address?.city , Validators.required],
      streetName : [this.address?.streetName , Validators.required],
      streetNumber : [this.address?.streetNumber , Validators.required],
      floor : [this.address?.floor],
      door : [this.address?.door]
    })
  }

  initializeFormEmpty() {
    this.form = this.formBuilder.group({
      zipCode : ['' , Validators.required],
      province : ['' , Validators.required],
      city : ['' , Validators.required],
      streetName : ['' , Validators.required],
      streetNumber : ['' , Validators.required],
      floor : ['' ],
      door : ['' ]
    })
  }
  
  override send($event : SubmitEvent): void {
    $event.preventDefault();
    if(this.form.valid) {
      console.log("form valid");
      this.addressFillOutByUser = {
        zipCode : this.form.get('zipCode')?.value,
        province : this.form.get('province')?.value,
        city : this.form.get('city')?.value,
        streetName : this.form.get('streetName')?.value,
        streetNumber : this.form.get('streetNumber')?.value,
        floor : this.form.get('floor')?.value,
        door : this.form.get('door')?.value
      }
      console.log(this.addressFillOutByUser);
      this.formFilledEvent.emit(this.addressFillOutByUser);
      this.closeUpdateModal();      
    }

  }

}
