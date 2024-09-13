import { HttpErrorResponse } from "@angular/common/http";
import { Component, EventEmitter, inject, Input, Output } from "@angular/core";
import { AdminService } from "app/core/services/admin_service/admin.service";
import { CustomFormPopUp } from "app/core/utils/custom-form-pop-up/custom.form.pop.up";
import { Observable } from "rxjs";

@Component({
    template: '',
    styleUrls: ['../../../../../../shared/styles/pop-up-form.scss', '../../../../../../shared/styles/admin_form.scss']
})


//Socket update is the most simple example 
export abstract class UpdateForm extends CustomFormPopUp {
   
    @Input({ required: true }) element_id !: string;
    @Output() UpdateSuccesfullyEmmitter = new EventEmitter();

    _adminService = inject(AdminService);
    abstract element$: any;

    elementUpdatedSuccessfully = false;
    elementUpdateFailed = false;
    errorMessage = '';

    successMessage = '';


    // Ej:
    // this.adminService.getSocketById(this.element_id, type);
    abstract getElementToUpdate(): Observable<any>;

    // Ej: 
    // const type = this.form.get('type')?.value;
    // if (type === null || type === '') {
    //     return;
    // }
    abstract confirmNoNullFields  (): boolean ;

    closeMessageModal(option: string) {
        switch (option) {
            case "elementUpdatedSuccessfully": {
                this.elementUpdatedSuccessfully = false
                this.UpdateSuccesfullyEmmitter.emit();
                this.closeUpdateModal();
            };
                break;
            case "elementUpdateFailed": {
                this.elementUpdateFailed = false
            };
                break;
        }
    }

    

}