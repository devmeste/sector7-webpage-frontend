import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BuildYourPcCartEntry } from 'app/core/models/BuildYourPcCartEntry';
import { BuildYourPcService } from 'app/core/services/build_your_pc/build-your-pc.service';
import { ConfirmPopUpComponent } from "../../../../../shared/components/pop_up/confirm-pop-up/confirm-pop-up.component";

@Component({
  selector: 'app-amd-vs-intel',
  standalone: true,
  imports: [NgClass, ConfirmPopUpComponent],
  templateUrl: './amd-vs-intel.component.html',
  styleUrl: './amd-vs-intel.component.scss'
})
export class AmdVsIntelComponent {


  intelIsActive: boolean = false;
  amdIsActive: boolean = false;
  move: boolean = false;
  move2: boolean = false;
  _router = inject(Router);
  _buildYourPcService = inject(BuildYourPcService);

  showChangeProcessorAlert: boolean = false;

  toggleIntel() {

    const line = this._buildYourPcService.getEntryBySection('linea');

    
    this.intelIsActive = true;
    this.move = true;
    this.move2 = true;
    setTimeout(() => {
      this.continueBuildingPc('Intel');
    }, 2300);
  }

  toggleAmd() {

    const line = this._buildYourPcService.getEntryBySection('linea');

    // Pregunto si hay un procesador AMD seleccionado
    if (line && line.selectedProductName === 'AMD' || line === null) {
      // Si hay un procesador AMD seleccionado aviso y que confirmen que quiere cambiarlo    
      this.amdIsActive = true;
      this.move = true;
      this.move2 = true;
      setTimeout(() => {
        this.continueBuildingPc('AMD');
      }, 2300);
    }
    else {
      this.showChangeProcessorAlert = true;
      // limpiar procesador, mother y memoria RAM
    }
  }

  removeDependentComponents() {
    
    this.closeModal('showChangeProcessorAlert');

    this._buildYourPcService.removeEntryBySection('procesadores');
    this._buildYourPcService.removeEntryBySection('mothers');
    this._buildYourPcService.removeEntryBySection('memorias');

    this.amdIsActive = true;
    this.move = true;
    this.move2 = true;
    setTimeout(() => {
      this.continueBuildingPc('AMD');
    }, 2300);
  }

  continueBuildingPc(line: string) {
    const newEntry: BuildYourPcCartEntry = {
      categoryName: 'Linea',
      selectedProductID: 'linea',
      selectedProductName: line,
      selectedProductQuantity: 1,
      titleWords: 'Linea',
      selectedProductPrice: 0,
      selectedProductPhoto: ''
    }

    this._buildYourPcService.updateBuildYourPcCart(newEntry)
    this._router.navigate(['/build-your-pc/Procesadores']);
  }


  closeModal(option: string) {
    switch (option) {
      case "showChangeProcessorAlert": this.showChangeProcessorAlert = false;
        break;
    }
  }
}
