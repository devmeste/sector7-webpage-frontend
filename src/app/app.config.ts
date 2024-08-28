import { ApplicationConfig } from '@angular/core';
import { provideRouter, UrlSerializer } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { adminInterceptor } from './core/interceptors/admin-interceptor/admin.interceptor';
import { userInterceptor } from './core/interceptors/user-interceptor/user.interceptor';
import { CustomUrlSerializer } from './core/utils/custom-url-serializer/CustomUrlSerializer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideAnimationsAsync(), 
    provideHttpClient(withInterceptors([adminInterceptor, userInterceptor])),
    // {provide : UrlSerializer , useClass : CustomUrlSerializer}
  ],
    
};
