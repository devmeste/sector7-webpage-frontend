import { Component, inject } from '@angular/core';
import { AuthService } from '../../../../core/services/auth_service/auth.service';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header-panel-logged-in-user',
  standalone: true,
  imports: [MatIconModule, RouterLink],
  templateUrl: './header-panel-logged-in-user.component.html',
  styleUrls: ['./header-panel-logged-in-user.component.scss', '../header-panel-common-styles.scss']
})
export class HeaderPanelLoggedInUserComponent {

  _authService = inject(AuthService);
  _router = inject(Router);

  logout() {
    this._authService.logout();
    this._router.navigate(['/']);
  }

  

}
