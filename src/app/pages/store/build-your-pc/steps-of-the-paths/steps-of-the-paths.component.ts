import { NgClass, NgFor } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterLink, UrlSegment } from '@angular/router';
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
  _router = inject(Router);


   ngOnInit(): void {
    this._buildYourPcCartService.getBuildYourPcCart().subscribe(cart => {
      // console.log(cart);
      this.cart$ = cart;
    });

    this._activatedRoute.params.subscribe(params => {
      // console.log("params en el camino: "+ params['section'] + "  ");
      this.section = params['section'] || '';
    })


  }
  closeMenu() {
    this.show = false;
    this.close.emit();
  }
}
