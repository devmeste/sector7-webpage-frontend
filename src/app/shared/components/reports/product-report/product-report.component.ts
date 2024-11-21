import { Component, inject, Signal, signal } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminService } from 'app/core/services/admin_service/admin.service';
import { CustomFormPopUp } from 'app/core/utils/custom-form-pop-up/custom.form.pop.up';
import { SpinnerS7Component } from "../../spinners/spinner-s7/spinner-s7.component";
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-product-report',
  standalone: true,
  imports: [SpinnerS7Component,NgClass,ReactiveFormsModule],
  templateUrl: './product-report.component.html',
  styleUrl: './product-report.component.scss',
})
export class ProductReportComponent extends CustomFormPopUp{


  _adminService = inject(AdminService);

  dataWasSendedSuccesfully : Signal<boolean> = signal(false);

  loading: boolean = false;


  override initializeForm(): void {
    this.form = this.formBuilder.group({
      client : ['', [Validators.required]],
      cuit: ['', [Validators.required]],
    })
  }
  override send(): void {
    const {client,cuit} = this.form.value;
     // Explicit inline typing
     const body : { client: string; cuit: string } = {
      client,
      cuit,
    };
    this._adminService.getProductsReport(body).subscribe(
      (response) => {
        const contentType = response.headers.get('Content-Type');
    
        if (response.body) {
          if (contentType?.includes('application/pdf')) {
            console.log("PDF");
            // Manejar PDF
            const blob = new Blob([response.body], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            window.open(url); // Abre el PDF en una nueva pestaña
          } 
        }
      },
      (error) => {
        console.error('Error al obtener el informe:', error);
      }
    );
  } 

}
