import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Roll } from '../clases/roll';
import {
  urlBase,
  urlLista,
  urlRoll,
  urlDelete,
  urlSave,
  urlPublica,
} from '../clases/urlglobales';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../authorization/auth.service';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class RollService {
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {}

  agregarAutorizacionHeader(){
    const token = this.authService.obteniendoToken();
    if (token != null){
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    return this.httpHeaders;
  }

  getRolles(): Observable<Roll[]> {
    return this.http.get(urlBase + urlLista + urlRoll, { headers: this.agregarAutorizacionHeader(), })
    .pipe(
      map((response: any) => {
        console.log(response as Roll[]);
        return response as Roll[];
      }), catchError(e => {
        console.log(e);
        if (e.status === 0){
          swal('Error', 'Al parecer no hay conexion con el servidor', 'error');
          this.router.navigate(['/login']);
        } else{
          swal('Error', 'Error con la solicitud requerida', 'warning');
          this.router.navigate(['/rollusuario']);
        }
        return throwError(e);
      })
      );
  }

  getRoll(id: number): Observable<Roll> {
    return this.http.get(urlBase + urlPublica + urlRoll + id).pipe(
      map((response) => {
        return response as Roll;
      }), catchError(e => {
        console.log(e);
        if (e.status === 0){
          swal('Error', 'Al parecer no hay conexion con el servidor', 'error');
          this.router.navigate(['/login']);
        } else{
          swal('Error', 'Error con la solicitud requerida', 'warning');
          this.router.navigate(['/rollusuario']);
        }
        return throwError(e);
      })
      );
  }
  create(roll: Roll): Observable<Roll> {
    return this.http.post<Roll>(urlBase + urlSave + urlRoll, roll, {
      headers: this.agregarAutorizacionHeader(),
    }).pipe(
      map((response) => {
        return response;
      }), catchError(e => {
        console.log(e);
        if (e.status === 0){
          swal('Error', 'Al parecer no hay conexion con el servidor', 'error');
          this.router.navigate(['/login']);
        } else if (e.status === 401){
          swal('Error ', 'Acceso denegado', 'error');
          this.router.navigate(['/login']);
        } else{
          swal('Error', 'Error con la solicitud requerida', 'warning');
        }
        return throwError(e);
      })
      );
  }
 
  delete(id: number): Observable<Roll> {
    return this.http.delete<Roll>(urlBase + urlDelete + urlRoll + id, {
      headers: this.agregarAutorizacionHeader(),
    });
  }
}
