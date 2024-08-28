import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { AmdVsIntelComponent } from "./vs-section/amd-vs-intel.component";
import { FooterComponent } from "../../../../shared/components/footer/footer.component";

@Component({
  selector: 'app-build-your-pc-vs',
  standalone: true,
  imports: [NgClass, AmdVsIntelComponent, FooterComponent],
  templateUrl: './build-your-pc-vs.component.html',
  styleUrl: './build-your-pc-vs.component.scss'
})
export class BuildYourPcVsComponent {
  
}
