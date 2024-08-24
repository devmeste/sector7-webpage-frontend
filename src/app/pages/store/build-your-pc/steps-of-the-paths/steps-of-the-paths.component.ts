import { NgClass, NgFor } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { ActivatedRoute, RouterLink, UrlSegment } from '@angular/router';
import { BuildYourPcCartEntry } from 'app/core/models/BuildYourPcCartEntry';
import { BuildYourPcService } from 'app/core/services/build_your_pc/build-your-pc.service';

@Component({
  selector: 'app-steps-of-the-paths',
  standalone: true,
  imports: [MatIcon, NgFor, NgClass, RouterLink],
  templateUrl: './steps-of-the-paths.component.html',
  styleUrl: './steps-of-the-paths.component.scss'
})
export class StepsOfThePathsComponent {
  
  _activatedRoute = inject(ActivatedRoute);

  @Input() show: boolean = true;
  @Output() close = new EventEmitter<void>();

  section!: string ;

  _buildYourPcCartService = inject(BuildYourPcService);
  cart$ !: BuildYourPcCartEntry[];

   ngOnInit(): void {
    this._buildYourPcCartService.getBuildYourPcCart().subscribe(cart => {
      this.cart$ = cart;
    });

    this._activatedRoute.firstChild?.url.subscribe((urlSegment) => {
      const currentPath = urlSegment[0]?.path.toLowerCase(); // Normaliza la ruta a minúsculas
      this.section = currentPath || ''; // 'procesadores', 'mothers', etc.
    });
  }



  closeMenu() {
    this.show = false;
    this.close.emit();
  }
}
