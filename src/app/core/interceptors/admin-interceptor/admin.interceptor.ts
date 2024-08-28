


import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'app/core/services/admin_service/admin.service';
import { AuthService } from 'app/core/services/auth_service/auth.service';
import { catchError, switchMap } from 'rxjs';

export const adminInterceptor: HttpInterceptorFn = (request, next) => {

  // return next(request);
  const _authService = inject(AuthService);
  const _router = inject(Router);

  let clonedRequest = request;


  if (_authService.isAdminLoggedIn()) {
    const token = localStorage.getItem('admin_token');
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
          if (error.status === 401 || error.status === 403) {
            _authService.logout();
            _router.navigate(['/auth/admin']);
          }
          return next(clonedRequest);
        })
      );
    }
  }

  return next(clonedRequest);
}
