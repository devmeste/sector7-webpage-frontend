import { AsyncPipe, NgClass, NgFor } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterLink, UrlSegment } from '@angular/router';
import { BuildYourPcCartEntry } from 'app/core/models/BuildYourPcCartEntry';
import { BuildYourPcService } from 'app/core/services/build_your_pc/build-your-pc.service';
import { ConfirmPopUpComponent } from "../../../../shared/components/pop_up/confirm-pop-up/confirm-pop-up.component";
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-steps-of-the-paths',
  standalone: true,
  imports: [MatIcon, NgFor, NgClass, RouterLink, ConfirmPopUpComponent, AsyncPipe],
  templateUrl: './steps-of-the-paths.component.html',
  styleUrl: './steps-of-the-paths.component.scss'
})
export class StepsOfThePathsComponent {


  _activatedRoute = inject(ActivatedRoute);

  @Input() show: boolean = true; // for mobile view
  @Output() close = new EventEmitter<void>(); // for mobile view

  section!: string;
  cartTotal$ !: BehaviorSubject<number>;
  _buildYourPcCartService = inject(BuildYourPcService);
  cart$ !: BuildYourPcCartEntry[];
  _router = inject(Router);


  showConfirmClearCartPopUp: boolean = false;

  ngOnInit(): void {
    this._buildYourPcCartService.getBuildYourPcCart().subscribe(cart => {
      this.cart$ = cart;
    });

    this.cartTotal$ = this._buildYourPcCartService.cartTotal$;

    this._activatedRoute.params.subscribe(params => {
      this.section = params['section'] || '';
    })


  }
  closeMenu() {
    this.show = false;
    this.close.emit();
  }

  askToClearCart() {
    this.showConfirmClearCartPopUp = true;
  }

  clearCart() {
    this._buildYourPcCartService.clearCart();
    this.showConfirmClearCartPopUp = false;
    this._router.navigate(['/build-your-pc/Linea']);
  }

  closePopUp(option: string) {
    switch (option) {
      case "showConfirmClearCartPopUp": this.showConfirmClearCartPopUp = false;
        break;
    }
  }

  Buy() {
    // Aca deberia mostrar pop up si falta algun producto clave
    // pero por lo charlado, no hay ningun filtro.
    this._router.navigate(['/build-your-pc/build-your-pc-summary']);
  }

}
