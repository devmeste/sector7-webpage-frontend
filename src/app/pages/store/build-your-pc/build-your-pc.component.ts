import { Component } from '@angular/core';
import { FooterComponent } from "../../../shared/components/footer/footer.component";
import { AmdVsIntelComponent } from "./vs/vs-section/amd-vs-intel.component";
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-build-your-pc',
    standalone: true,
    templateUrl: './build-your-pc.component.html',
    styleUrl: './build-your-pc.component.scss',
    imports: [FooterComponent,MatIcon]
})
export class BuildYourPcComponent {

}
