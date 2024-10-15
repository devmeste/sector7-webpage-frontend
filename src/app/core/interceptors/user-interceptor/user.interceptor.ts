import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/core/services/auth_service/auth.service';
import { catchError, switchMap } from 'rxjs';

export const userInterceptor: HttpInterceptorFn = (request, next) => {

  const _authService = inject(AuthService);
  const _router = inject(Router);
  let clonedRequest = request;
  
  if (_authService.isUserLoggedIn$()) {
    const token = localStorage.getItem('token');
    
    if (token) {
      if (clonedRequest.headers.get('skip') == 'true') {
        return next(clonedRequest);
      }

      return _authService.verifyToken(token).pipe(
        switchMap((response) => {
          if (response) {
            clonedRequest = request.clone(
              {
                setHeaders: {
                  Authorization: `Bearer ${response.token}`
                },
              },
            )
          }
          return next(clonedRequest);
        }),

        catchError((error) => {
          if (error.status === 401) {
            _authService.logout();
            _router.navigate(['/auth']);
          }
          return next(clonedRequest);
        })
      );
    }
  }

  return next(clonedRequest);

}
