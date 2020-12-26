import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs'
import { MeGusta } from '../clases/MeGusta';
import { urlBase, urlLista, urlPublica, urlSave, urlDelete, urlMegusta,} from '../clases/urlglobales';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../authorization/auth.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Injectable({
  providedIn: 'root',
})
export class MeGustaService {
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {}

  agregarAutorizacionHeader(){
    const token = this.authService.obteniendoToken();
    if (token != null){
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    return this.httpHeaders;
  }

  getMegustan(): Observable<MeGusta[]> {
    return this.http.get(urlBase + urlLista + urlMegusta).pipe(
      map((response: any) => {
        console.log(response.content as MeGusta[]);
        return response.content as MeGusta[];
      })
    );
  }

  getMegusta(id: number): Observable<MeGusta> {
    return this.http.get(urlBase + urlPublica + urlMegusta + id).pipe(
      map((response) => {
        return response as MeGusta;
      })
    );
  }

  create(megusta: MeGusta): Observable<boolean> {
    return this.http.post<MeGusta>(urlBase + urlSave + urlMegusta, megusta, {
      headers: this.agregarAutorizacionHeader(),
    }).pipe(
      map((response: any) => {
        console.log(response.obj);
        return response.obj;
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


  delete(id: number): Observable<MeGusta> {
    return this.http.delete<MeGusta>(urlBase + urlDelete + urlMegusta + id, {
      headers: this.agregarAutorizacionHeader(),
    });
  }
}
