import { NgClass, NgFor } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { BuildYourPcCartEntry } from 'app/core/models/BuildYourPcCartEntry';
import { BuildYourPcService } from 'app/core/services/build_your_pc/build-your-pc.service';

@Component({
  selector: 'app-steps-of-the-paths',
  standalone: true,
  imports: [MatIcon, NgFor, NgClass],
  templateUrl: './steps-of-the-paths.component.html',
  styleUrl: './steps-of-the-paths.component.scss'
})
export class StepsOfThePathsComponent {
getEntrysOfCart() {
throw new Error('Method not implemented.');
}

  @Input() show: boolean = true;
  @Output() close = new EventEmitter<void>();

  _buildYourPcCartService = inject(BuildYourPcService);
  cart$ !: BuildYourPcCartEntry[];

  ngOnInit(): void {
    this._buildYourPcCartService.getBuildYourPcCart().subscribe(cart => {
      this.cart$ = cart;
    });
  }

  closeMenu() {
    this.show = false;
    this.close.emit();
  }
}
