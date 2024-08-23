import { Component, HostListener, inject } from '@angular/core';
import { FooterComponent } from "../../../shared/components/footer/footer.component";
import { AmdVsIntelComponent } from "./vs/vs-section/amd-vs-intel.component";
import { MatIcon } from '@angular/material/icon';
import { StepsOfThePathsComponent } from "./steps-of-the-paths/steps-of-the-paths.component";
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { TwoColorsCardComponent } from "../../../shared/components/cards/two-colors-card/two-colors-card.component";
import { filter, switchMap } from 'rxjs';
import { BuildYourPcCardsContentComponent } from "./build-your-pc-cards-content/build-your-pc-cards-content.component";
import { BuildYourPcService } from 'app/core/services/build_your_pc/build-your-pc.service';

@Component({
  selector: 'app-build-your-pc',
  standalone: true,
  templateUrl: './build-your-pc.component.html',
  styleUrl: './build-your-pc.component.scss',
  imports: [FooterComponent, MatIcon, StepsOfThePathsComponent, RouterOutlet, TwoColorsCardComponent, BuildYourPcCardsContentComponent]
})
export class BuildYourPcComponent {

  showMenuInMobile = false;

  section = '';
  titleWord = '';
  _activatedRoute = inject(ActivatedRoute);
  _buildYourPcService = inject(BuildYourPcService);

  ngOnInit(): void {
    this._activatedRoute.params.subscribe(params => {
      this.section = params['section'];
      this.titleWord = this._buildYourPcService.getTitleWordBySection(this.section);
    })
  }


  toggleMenu() {
    this.showMenuInMobile = !this.showMenuInMobile;
  }
  
}
