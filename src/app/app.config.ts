import { ApplicationConfig, Provider, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { HttpRequestInterceptor } from './services/interceptors/http-request.interceptor';
import { LoadingService } from './services/loading.service';

const httpInterceptor: Provider =
  { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true }


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideClientHydration(), 
    provideHttpClient(withFetch()),
    LoadingService,
    importProvidersFrom(HttpClientModule),
    httpInterceptor
  ]
};
