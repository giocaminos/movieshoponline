import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Clasificacion } from '../clases/clasificacion';
import {
  urlBase,
  urlLista,
  urlClasificacion,
  urlSave,
  urlDelete,
  urlPublica,
} from '../clases/urlglobales';
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { AuthService } from '../authorization/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ClasificacionService {
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {}

  agregarAutorizacionHeader(){
    const token = this.authService.obteniendoToken();
    if (token != null){
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    return this.httpHeaders;
  }

  getClasificaciones(): Observable<Clasificacion[]> {
    return this.http
      .get(urlBase + urlPublica + urlLista + urlClasificacion)
      .pipe(
        map((response) => {
          return response as Clasificacion[];
        })
      );
  }

  getClasificacion(id): Observable<Clasificacion> {
    return this.http.get(urlBase + urlPublica + urlClasificacion + id).pipe(
      map((response) => {
        return response as Clasificacion;
      })
    );
  }

  create(clasificacion: Clasificacion): Observable<Clasificacion> {
    return this.http.post<Clasificacion>(
      urlBase + urlSave + urlClasificacion,
      clasificacion,
      { headers: this.agregarAutorizacionHeader() }
    ).pipe(
      map((response) => {
        return response;
      }),
      catchError(e => {
        if (e.status === 401){
          this.router.navigate(['/login']);
          Swal('Error ', 'Acceso denegado', 'error');
        }else{
          Swal('Error ', 'Error al Guardar', 'error');
        }

        return throwError(e);
      })
    );
  }

  delete(id): Observable<Clasificacion> {
    return this.http.delete<Clasificacion>(
      urlBase + urlDelete + urlClasificacion + id,
      { headers: this.agregarAutorizacionHeader() }
    ).pipe(
      catchError(e => {
        this.router.navigate(['/clasificaciones']);

        if (e.status == 401){
          Swal('Error ', 'Acceso denegado', 'error');
        }else{
          Swal('Error ', 'Error interno en el servidor', 'error');
        }

        return throwError(e);
      })
    );
  }
}

