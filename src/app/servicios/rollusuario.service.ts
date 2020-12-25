import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { RollUsuario } from '../clases/rollusuario';
import {
  urlBase,
  urlLista,
  urlRollusuario,
  urlPublica,
  urlSave,
  urlDelete,
} from '../clases/urlglobales';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../authorization/auth.service';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class RollusuarioService {
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {}

  agregarAutorizacionHeader(){
    const token = this.authService.obteniendoToken();
    if (token != null){
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    return this.httpHeaders;
  }

  getRollUsuarios(): Observable<RollUsuario[]> {
    return this.http.get(urlBase + urlPublica + urlLista + urlRollusuario).pipe(
      map((response) => {
        return response as RollUsuario[];
      })
    );
  }

  getRollUsuario(id: number): Observable<RollUsuario> {
    return this.http.get(urlBase + urlPublica + urlRollusuario + id).pipe(
      map((response) => {
        return response as RollUsuario;
      })
    );
  }

  create(rollUsuario: RollUsuario): Observable<RollUsuario> {
    return this.http.post<RollUsuario>(
      urlBase + urlSave + urlRollusuario,
      rollUsuario,
      { headers: this.agregarAutorizacionHeader() }
    ).pipe(
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

  delete(id: number): Observable<RollUsuario> {
    return this.http.delete<RollUsuario>(
      urlBase + urlDelete + urlRollusuario + id,
      { headers: this.agregarAutorizacionHeader()}
    );
  }
}
