import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CustomForm } from '../custom-form/custom.form';
import { AdminService } from 'app/core/services/admin_service/admin.service';
import { Observable } from 'rxjs';

// @Component Just to allow use the ngOnInit
@Component({
    template: ''
})
export abstract class GetAllGeneric {

    _adminService = inject(AdminService);
    
    elementDeletionFailed: boolean = false;
    errorMessage: boolean = false;

    abstract elements$: any[]; // ej: ISocket

    //pop ups
    elementDeletedSuccessfully: boolean = false;
    showPopUpToConfirmDelete: boolean = false;
    showUpdatePopUp: boolean = false;
    elementIdToDelete = "";
    update_id = "";
    isLoading: boolean = false;
    



    closeModal(option: string): void {
        switch (option) {
            case "elementDeletedSuccessfully": this.elementDeletedSuccessfully = false;
                break;
            case "elementDeletionFailed": this.elementDeletionFailed = false;
                break;
            case "showUpdatePopUp": this.showUpdatePopUp = false;
                break;
            case "showPopUpToConfirmDelete": {
                this.showPopUpToConfirmDelete = false;
                this.elementIdToDelete = "";
            }
                break;
        }
    }


    deleteElement(id: string) {
        this.daleteElementById(id).subscribe({
            next: () => {
                this.elementDeletedSuccessfully = true
                this.updateElementsState();
            },
            error: (e) => {
                this.elementDeletionFailed = true
                this.errorMessage = e.error.message
            },
        }
        );
    }


    // Ej:
    // getElementById(id: string): Observable<any> {
    //     return this._adminService.deleteScocket(id);
    // }
    abstract daleteElementById(id: string): Observable<any>;


    updateElementsState(): void {
        this.isLoading = true;
        this.getArrayElementsFromService().subscribe(elements => {
            this.elements$ = elements;
            this.isLoading = false;
        })
    }

    //Ej: 
    // getArrayElementsFromService() : Observable<any> {
    //     return this._adminService.getAllGenerations();
    //}
    abstract getArrayElementsFromService(): Observable<any>;

    ngOnInit(): void {
        this.updateElementsState();
    }

    showUpdatePopUpMethod(id: string) {
        this.showUpdatePopUp = true;
        this.update_id = id;
    }

    askToConfirmDelete(id: string) {
        this.showPopUpToConfirmDelete = true;
        this.elementIdToDelete = id;
    }

    confirmDeleteAction() {
        this.deleteElement(this.elementIdToDelete);
        this.closeModal("showPopUpToConfirmDelete");
    }
}