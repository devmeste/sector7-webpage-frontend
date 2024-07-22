import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from 'app/core/services/auth_service/auth.service';
import { firstValueFrom } from 'rxjs';

export const userGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isLoggedIn = await firstValueFrom(authService.isUserLoggedIn$());

  if(isLoggedIn){
    return true;
  }
  else{
    const urlTree : UrlTree = router.createUrlTree(['auth/must-login']);
    return urlTree;
  }

};
