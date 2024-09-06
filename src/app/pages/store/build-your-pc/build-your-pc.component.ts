import { Component, HostListener, inject } from '@angular/core';
import { FooterComponent } from "../../../shared/components/footer/footer.component";
import { AmdVsIntelComponent } from "./vs/vs-section/amd-vs-intel.component";
import { MatIcon } from '@angular/material/icon';
import { StepsOfThePathsComponent } from "./steps-of-the-paths/steps-of-the-paths.component";
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { TwoColorsCardComponent } from "../../../shared/components/cards/two-colors-card/two-colors-card.component";
import { filter, Subscription, switchMap } from 'rxjs';
import { BuildYourPcService } from 'app/core/services/build_your_pc/build-your-pc.service';
import { ProcesadoresComponent } from "./cards-children/procesadores/procesadores.component";
import { MemoriasComponent } from "./cards-children/memorias/memorias.component";
import { MothersComponent } from "./cards-children/mothers/mothers.component";
import { AlmacenamientoComponent } from "./cards-children/almacenamiento/almacenamiento.component";
import { FuentesComponent } from "./cards-children/fuentes/fuentes.component";
import { PlacasDeVideoComponent } from "./cards-children/placas-de-video/placas-de-video.component";
import { MonitoresComponent } from "./cards-children/monitores/monitores.component";
import { RefrigeracionComponent } from "./cards-children/refrigeracion/refrigeracion.component";
import { TecladosComponent } from "./cards-children/teclados/teclados.component";
import { GabinetesComponent } from "./cards-children/gabinetes/gabinetes.component";
import { MousesComponent } from "./cards-children/mouses/mouses.component";
import { AuricularesComponent } from "./cards-children/auriculares/auriculares.component";
import { BuildYourPcSummaryComponent } from "./cards-children/build-your-pc-summary/build-your-pc-summary.component";

@Component({
  selector: 'app-build-your-pc',
  standalone: true,
  templateUrl: './build-your-pc.component.html',
  styleUrl: './build-your-pc.component.scss',
  imports: [FooterComponent, MatIcon, StepsOfThePathsComponent, RouterOutlet, TwoColorsCardComponent, ProcesadoresComponent, MemoriasComponent, MothersComponent, AlmacenamientoComponent, FuentesComponent, PlacasDeVideoComponent, MonitoresComponent, RefrigeracionComponent, TecladosComponent, GabinetesComponent, MousesComponent, AuricularesComponent, BuildYourPcSummaryComponent]
})
export class BuildYourPcComponent {

  showMenuInMobile = false;

  section = '';
  titleWord = '';
  _activatedRoute = inject(ActivatedRoute);
  _buildYourPcService = inject(BuildYourPcService);
  subscriptios : Subscription[] = [];
  _router = inject(Router);


  ngOnInit(): void {
    this._activatedRoute.params.subscribe(params=>{
      

      if(params['section']){
        this.titleWord = this._buildYourPcService.getTitleWordBySection(params['section']);
        
        if(!this.titleWord && params['section'] !== 'build-your-pc-summary') {
          this._router.navigate(['build-your-pc']);
          return;
        }
        this.section = params['section'];
      }
      else{
        this._router.navigate(['build-your-pc','linea']);
      }
    });
   

  }



  toggleMenu() {
    this.showMenuInMobile = !this.showMenuInMobile;
  }

}
