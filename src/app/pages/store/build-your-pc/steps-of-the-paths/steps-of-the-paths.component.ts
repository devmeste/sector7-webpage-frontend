import { NgClass, NgFor } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output, output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { OutletContext } from '@angular/router';
import { BuildYourPcService } from 'app/core/services/build_your_pc/build-your-pc.service';

@Component({
  selector: 'app-steps-of-the-paths',
  standalone: true,
  imports: [MatIcon,NgFor,NgClass],
  templateUrl: './steps-of-the-paths.component.html',
  styleUrl: './steps-of-the-paths.component.scss'
})
export class StepsOfThePathsComponent {

  @Input() show : boolean = true;
  @Output() close = new EventEmitter<void>();

  _buildYourPcCartService = inject(BuildYourPcService);
  cart$ !: any;
  ngOnInit(): void {
    this.cart$ = this._buildYourPcCartService.getBuildYourPcCart();
  }

  getCartEntries() {
    console.log(Object.entries(this.cart$));
    return Object.entries(this.cart$ );
  }


  closeMenu(){
    this.show=false;
    this.close.emit();
  }
}
