import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AmdVsIntelComponent } from "./vs-section/amd-vs-intel.component";
import { FooterComponent } from "../../../../shared/components/footer/footer.component";
import { AuthService } from 'app/core/services/auth_service/auth.service';
import { MessagePopUpComponent } from "../../../../shared/components/pop_up/message-pop-up/message-pop-up.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-build-your-pc-vs',
  standalone: true,
  imports: [NgClass, AmdVsIntelComponent, FooterComponent, MessagePopUpComponent],
  templateUrl: './build-your-pc-vs.component.html',
  styleUrl: './build-your-pc-vs.component.scss'
})
export class BuildYourPcVsComponent {

  
  isUserOrAdminLogged : boolean = false;
  _authService = inject(AuthService);
  _router = inject(Router);

  constructor() {
    window.scrollTo(0, 0);
  }

  ngOnInit(): void {
    this.isUserOrAdminLogged = this._authService.isAnyUserOrAdminLoggedIn(); 
    
  }

  redirectToLogin() {
    this._router.navigate(['auth']);
    }

    redirectToHome() {
      console.log("Holaaa");
      this._router.navigate(['']);
    }
}
