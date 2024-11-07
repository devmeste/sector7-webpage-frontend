import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnErrorHasOcurredComponent } from '@shared/components/messages/an-error-has-ocurred/an-error-has-ocurred.component';
import { AuthService } from 'app/core/services/auth_service/auth.service';

@Component({
  selector: 'app-user-verification',
  standalone: true,
  imports: [AnErrorHasOcurredComponent],
  templateUrl: './user-verification.component.html',
  styleUrl: './user-verification.component.scss'
})
export class UserVerificationComponent {


  _authService: AuthService = inject(AuthService);
  private _activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  code: string = '';

  showUserVerificationErrorPage: boolean = false;
  userVerificationSuccess: boolean = false;
  errorMessage: string = '';


  ngOnInit(): void {

    this._activatedRoute.queryParamMap.subscribe(params => {

      if (params.get('code')) {
        this.code = params.get('code') || '';

        this._authService.verifyAccount(this.code).subscribe({

          next: () => {
            this.userVerificationSuccess = true;
          },
          error: (error) => {
            this.errorMessage = error.error.message;
            this.showUserVerificationErrorPage = true;
          }
        });
      }
      else {
        this.errorMessage = "Ocurrió un error al verificar tu cuenta";
        this.showUserVerificationErrorPage = true;
      }
    });
  }

  redirectToLogin() {
    window.location.href = '/auth';
  }

  // Si hay erro -> 
}
