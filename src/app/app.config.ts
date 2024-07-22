import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { adminInterceptor } from './core/interceptors/admin-interceptor/admin.interceptor';
import { userInterceptor } from './core/interceptors/user-interceptor/user.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideAnimationsAsync(), 
    provideHttpClient(withInterceptors([adminInterceptor, userInterceptor])),
  ],
    
};
