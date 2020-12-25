import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Usuario } from '../clases/usuario';
import { map, catchError } from 'rxjs/operators';
import {
  urlBase,
  urlLista,
  urlUsuario,
  urlPublica,
  urlSave,
  urlDelete,
} from '../clases/urlglobales';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../authorization/auth.service';
import { urlRegistro, urlReset, urlPassword } from '../clases/urlglobales';
import swal from 'sweetalert2';
import { Billetera } from '../clases/billetera';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {}

  agregarAutorizacionHeader(){
    const token = this.authService.obteniendoToken();
    if (token != null){
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    return this.httpHeaders;
  }

  agregarAutorizacionHeaderReset(token: string){  
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);    
  }

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get(urlBase + urlLista + urlUsuario).pipe(
      map((response: any) => {
        return response.content as Usuario[];
      })
    );
  }

  getUsuario(id: number): Observable<Usuario> {
    return this.http.get(urlBase + urlPublica + urlUsuario + id).pipe(
      map((response) => {
        return response as Usuario;
      })
    );
  }
  create(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(urlBase + urlPublica + urlRegistro + urlUsuario, usuario, {
      headers: this.httpHeaders,
    }).pipe(
      map((response: any) => response),
      catchError(e => {
        console.log(e);
        swal('Error', 'Error al Guardar', 'warning');
        return throwError(e);
      })
    );
  }

  createBilletera(billetera: Billetera): Observable<Billetera> {
    return this.http.post<Usuario>(urlBase + urlPublica + urlRegistro + urlUsuario, billetera, {
      headers: this.httpHeaders,
    }).pipe(
      map((response: any) => response),
      catchError(e => {
        console.log(e);
        swal('Error', 'Error al Guardar', 'warning');
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<Usuario> {
    return this.http.delete<Usuario>(urlBase + urlDelete + urlUsuario + id, {
      headers: this.agregarAutorizacionHeader(),
    });
  }

  enviarAlCorreoTocken(usuario: Usuario):Observable<any> {
    return this.http.post<any>(urlBase + urlPublica + urlReset + urlUsuario, usuario).pipe(
      map((response) => {
        swal('Exito', 'El mensaje se envio a su '+usuario.tipoEnvioJWT, 'success');
        return response ;
      }),
      catchError(e => {
        console.log(e);
        swal('Error', 'Error al enviar el mensaje', 'warning');
        return throwError(e);
      })
    );    
  }

  enviarReset(usuario: Usuario, tocken: string):Observable<Usuario> {
    console.log(JSON.stringify(usuario) + tocken)    

    return this.http.post<any>(urlBase + urlPublica + urlReset + urlPassword, usuario,{
      headers: this.agregarAutorizacionHeaderReset(tocken),
    }).pipe(
      map((response) => {
        this.router.navigate(['/login']);
        swal('Exito', 'La contrasena se actualizo', 'success');
        return response ;
      }),
      catchError(e => {
        console.log(e);
        if(e.status===401){
          this.router.navigate(['/login']);
          swal('Error', 'Error Acceso denegado el token ha expirado', 'warning');
        }else{
          swal('Error', 'Error al actualizar contrasena', 'warning');
        }        
        return throwError(e);
      })
    );
}
}
