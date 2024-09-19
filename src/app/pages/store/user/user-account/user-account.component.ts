import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from 'app/core/services/auth_service/auth.service';
import { filter } from 'rxjs';
import { UserProfileComponent } from "../user-profile/user-profile.component";
import { IUserResponse } from 'app/core/models/IUserResponse';

@Component({
  selector: 'app-user-account',
  standalone: true,
  imports: [RouterLink, RouterOutlet, NgClass, UserProfileComponent],
  templateUrl: './user-account.component.html',
  styleUrl: './user-account.component.scss'
})
export class UserAccountComponent {
  _authservice = inject(AuthService)
  _activatedRoute = inject(ActivatedRoute)
  _router = inject(Router);
  isDashboardView: boolean = true;

  user !: IUserResponse;
  
  ngOnInit(): void {

    this._router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.checkRoute();
    });
    
    this._authservice.getUser().subscribe(user => {
      this.user = user;
    })

    this.checkRoute();
  }

  checkRoute(): void {
    const url = this._router.url;
    this.isDashboardView = url === '/user-account';
  }
  


  logout() {
    this._authservice.logout()
  }

}
