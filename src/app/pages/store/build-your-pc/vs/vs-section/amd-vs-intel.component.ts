import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
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
  move : boolean = false;
  move2: boolean = false;
  _router = inject(Router);
  _buildYourPcService = inject(BuildYourPcService);

  toggleIntel() {
    this.intelIsActive = true;
    this.move = true;
    this.move2 = true;
    setTimeout(() => {
      this.continueBuildingPc();
    }, 2000);
  }

  toggleAmd() {
    this.amdIsActive = true;
    this.move = true;
    this.move2= true;
    setTimeout(() => {
      this.continueBuildingPc();
    }, 2300);
  }

  continueBuildingPc() {
    this._router.navigate(['/build-your-pc/']);
  }
  

}
