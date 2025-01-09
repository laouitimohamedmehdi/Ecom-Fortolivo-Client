import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const toastr = inject(ToastrService);

  return next(req).pipe(
    catchError((err) => {
      if (err.status === 400) {
        if (err.error.errors) {
          throw err.error
        }
        else {
          toastr.error(err.error.message, err.error.statusCode);
        }
      }
      if (err.status === 401) {
        toastr.error(err.error.message, err.error.statusCode);
      }
      if (err.status === 404) {
        router.navigateByUrl('/not-found');
      } else if (err.status === 500) {
        const navigationExtra:NavigationExtras = {state: {error:err.error}}
        router.navigateByUrl('/server-error', navigationExtra);
      }

      return throwError(() => err);
    })
  );
};