import { Component, HostListener } from '@angular/core';
import { FooterComponent } from "../../../shared/components/footer/footer.component";
import { AmdVsIntelComponent } from "./vs/vs-section/amd-vs-intel.component";
import { MatIcon } from '@angular/material/icon';
import { StepsOfThePathsComponent } from "./steps-of-the-paths/steps-of-the-paths.component";
import { RouterOutlet } from '@angular/router';
import { TwoColorsCardComponent } from "../../../shared/components/cards/two-colors-card/two-colors-card.component";

@Component({
    selector: 'app-build-your-pc',
    standalone: true,
    templateUrl: './build-your-pc.component.html',
    styleUrl: './build-your-pc.component.scss',
    imports: [FooterComponent, MatIcon, StepsOfThePathsComponent, RouterOutlet, TwoColorsCardComponent]
})
export class BuildYourPcComponent {

    showMenuInMobile=false;

    items = Array(12).fill(0); // later will be replaced by real data

    toggleMenu(){
        this.showMenuInMobile = !this.showMenuInMobile;
    }
}
