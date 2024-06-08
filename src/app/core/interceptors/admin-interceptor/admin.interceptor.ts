import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from 'app/core/services/auth_service/auth.service';

export const adminInterceptor: HttpInterceptorFn = (request, next) => {
  
  // return next(request);

  const _authService = inject(AuthService);
  let clonedRequest = request;

  if(_authService.isAdminLoggedIn()){
    console.log("Entro en el isAdminLoggedIn del admin interceptor");
    const token = localStorage.getItem('admin_token');
    clonedRequest = request.clone(
      {
        setHeaders : {
          Authorization: `Bearer ${token}`},    
      }
    )
  }
  
  return next( clonedRequest );
};
