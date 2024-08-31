import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CustomForm } from '../custom-form/custom.form';
import { AdminService } from 'app/core/services/admin_service/admin.service';

// @Component Just to allow use the ngOnInit
@Component({
    template: ''
})
export abstract class CreateForm  extends CustomForm implements OnInit {

    _adminService = inject(AdminService);

    abstract elementToCreate : string 

    // state of pop ups
    elementWasCreatedSuccessfully: boolean = false;
    errorCreatingElement: any;
    errorMessage: any;
    isLoading: boolean = false;


    abstract closeModal(option: string):void;
    
}