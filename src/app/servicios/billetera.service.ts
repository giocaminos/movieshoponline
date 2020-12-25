import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Billetera } from '../clases/billetera';
import { map, catchError } from 'rxjs/operators';
import {
  urlBase,
  urlLista,
  urlBilletera,
  urlPublica,
  urlSave,
  urlDelete,
} from '../clases/urlglobales';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../authorization/auth.service';
import swal from 'sweetalert2';
import { urlUsuario } from '../clases/urlglobales';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class BilleteraService {
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) {}

  agregarAutorizacionHeader(){
    const token = this.authService.obteniendoToken();
    if (token != null){
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    return this.httpHeaders;
  }

  getBilleteras(): Observable<Billetera[]> {
    return this.http.get(urlBase + urlLista + urlBilletera).pipe(
      map((response: any) => {
        console.log(response.content as Billetera[]);
        return response.content as Billetera[];
      })
    );
  }

  getBilletera(id: number): Observable<Billetera> {
    return this.http.get(urlBase + urlPublica + urlBilletera + id).pipe(
      map((response) => {
        return response as Billetera;
      }),
      catchError(e => {
        if (e.status === 401){
          this.router.navigate(['/login']);
          swal('Error ', 'Acceso denegado', 'error');
        }
        return throwError(e);
      })
    );
  }

  getMyBilletera(email: string): Observable<Billetera> {
    return this.http.get(urlBase + urlUsuario + urlBilletera + email,
      { headers: this.agregarAutorizacionHeader() }).pipe(
      map((response) => {
        return response as Billetera;
      })
    );
  }

  create(billetera: Billetera): Observable<Billetera> {
    return this.http.post<Billetera>(
      urlBase + urlSave + urlBilletera,
      billetera,
      { headers: this.agregarAutorizacionHeader() }
    ).pipe(
      map((response: any) => response),
      catchError(e => {
        console.log(e);
        swal('Error', 'Error al Guardar', 'warning');
        return throwError(e);
      })
    );
  }

  
  delete(id: number): Observable<Billetera> {
    return this.http.delete<Billetera>(
      urlBase + urlDelete + urlBilletera + id,
      { headers: this.agregarAutorizacionHeader() }
    );
  }
}
