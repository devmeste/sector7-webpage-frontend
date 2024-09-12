import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from 'app/core/services/auth_service/auth.service';
import { firstValueFrom } from 'rxjs';

export const combinedGuard: CanActivateFn = async (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);
  
  const isAdminLoggedIn = await firstValueFrom(authService.isAdminLoggedIn$());

  const isUserLoggedIn = await firstValueFrom(authService.isUserLoggedIn$());

  if (isUserLoggedIn === true || isAdminLoggedIn === true) {
    return true;
  }
  else{
    const urlTree : UrlTree = router.createUrlTree(['auth']);
    return urlTree;
  }

};
