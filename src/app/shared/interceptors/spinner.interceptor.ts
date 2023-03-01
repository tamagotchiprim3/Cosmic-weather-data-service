import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { catchError, Observable, tap } from 'rxjs';
import {
  decreaseSpinner,
  increaseSpinner,
} from 'src/app/store/app/app.actions';
@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
  constructor(private store: Store) {}

  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(this.addSpinner(req)).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          this.store.dispatch(decreaseSpinner());
        }
      }),
      catchError((error: HttpErrorResponse) => {
        this.store.dispatch(decreaseSpinner());
        throw error;
      })
    );
  }

  public addSpinner(req: HttpRequest<any>): HttpRequest<any> {
    this.store.dispatch(increaseSpinner());
    return req;
  }
}
