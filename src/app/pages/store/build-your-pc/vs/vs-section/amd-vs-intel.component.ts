import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BuildYourPcCartEntry } from 'app/core/models/BuildYourPcCartEntry';
import { BuildYourPcService } from 'app/core/services/build_your_pc/build-your-pc.service';

@Component({
  selector: 'app-amd-vs-intel',
  standalone: true,
  imports: [NgClass],
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

  toggleIntel() {
    this.intelIsActive = true;
    this.move = true;
    this.move2 = true;
    setTimeout(() => {
      this.continueBuildingPc('Intel');
    }, 2000);
  }

  toggleAmd() {
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
      selectedProductName: line,
      selectedProductQuantity: 1,
      titleWords: 'Linea'
    }
    this._buildYourPcService.updateBuildYourPcCart(newEntry)
    this._router.navigate(['/build-your-pc/Procesadores']);
  }
}
