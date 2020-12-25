import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { urlLogin, httpHeadersLogin } from '../clases/urlglobales';
import { Usuario } from '../clases/usuario';
import { catchError } from 'rxjs/operators';
import { TOCKEN } from '../clases/tocken';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token: TOCKEN;
  constructor(private http: HttpClient, private router: Router) {}

  login(usuario: Usuario): Observable<any> {
    const params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', usuario.email);
    params.set('password', usuario.contrasena);

    console.log(params.toString());

    return this.http
      .post<any>(urlLogin, params.toString(), { headers: httpHeadersLogin })
      .pipe(
        catchError((e) => {
          console.log('vamos a enviar el error vara validacion..');
          return throwError(e);
        })
      );
  }

  guardarToken(accessTocken: string) {
    sessionStorage.setItem('token', accessTocken);
  }

  obteniendoToken(): string{
    if(sessionStorage.getItem('token') != null){
      if(this.tokenExpirado()){
        this.router.navigate(['/login']);
        return null;
      }else{
        return sessionStorage.getItem('token');
      }
    }else{
      console.log('null storag... ' + sessionStorage.getItem('token') );
      return null;
    }
  }

  public isAutenticado(): boolean{
    if(sessionStorage.getItem('token') != null){
      if(this.tokenExpirado()){
        return false;
      }else{
        return true;
      }
    }else{
      return false;
    }
  }

  hasRole(roll: string): boolean {
    if (this.obtenerdatosTokenPayloadStorage().authorities.includes(roll)){
      return true;
    }else{
      return false;
    }
  }

  obtenerdatosTokenPayloadStorage(): TOCKEN {
    this.token = new TOCKEN();
    const accessToken = sessionStorage.getItem('token');
    if (accessToken != null) {
      const obj = JSON.parse(atob(accessToken.split('.')[1]));
      this.token.user_name = obj.user_name;
      this.token.id = obj.id;
      this.token.nombre_apellido = obj.nombre_apellido;
      this.token.authorities = obj.authorities;
      this.token.client_id = obj.client_id;
      this.token.exp = obj.exp;
    }
    return this.token;
  }

  tokenExpirado(): boolean {
    const fechaActual = new Date();
    const fechaExpiracionToken = new Date(this.obtenerdatosTokenPayloadStorage().exp * 1000);
    if (fechaExpiracionToken >= fechaActual) {
      return false;
    } else {
      sessionStorage.clear();
      return true;
    }
  }

  obtenerdatosTokenPayload(accessToken: string): TOCKEN {
    this.token = new TOCKEN();
    if (accessToken != null) {
      const obj = JSON.parse(atob(accessToken.split('.')[1]));
      this.token.user_name = obj.user_name;
      this.token.id = obj.id;
      this.token.nombre_apellido = obj.nombre_apellido;
      this.token.authorities = obj.authorities;
      this.token.client_id = obj.client_id;
      this.token.exp = obj.exp;
    }
    return this.token;
  }
}
