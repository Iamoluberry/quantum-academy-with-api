import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../api-service/auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    //get the token
    const authToken = this.authService.getToken();

    if (authToken) {
      const tokenizedResponse = request.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`
        }
      })

      return next.handle(tokenizedResponse);
    }

    return next.handle(request);
  }
}
 