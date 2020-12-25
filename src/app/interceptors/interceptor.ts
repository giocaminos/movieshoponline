import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { SpinnerService } from '../servicios/spinner.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
    constructor(public spinner: SpinnerService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.spinner.show();
        return next.handle(req).pipe(
            finalize(() => {
               this.spinner.hide();
            })
        );
    }
}