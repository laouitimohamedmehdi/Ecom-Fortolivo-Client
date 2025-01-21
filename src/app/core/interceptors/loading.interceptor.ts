import { HttpInterceptorFn } from '@angular/common/http';
import { LoaderService } from '../services/loader.service';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { delay } from 'rxjs/operators';
import { request } from 'https';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loaderService = inject(LoaderService);
  if (!req.url.includes('Check-Email-Exist')) {
    //return next(req);
    loaderService.loader()
  }
  
  return next(req).pipe(
    delay(1000),
    finalize(() => {
      loaderService.hidingLoader();
      })
  );
};
