import { Injectable } from '@angular/core';
import { Pelicula } from '../clases/pelicula';
import { Observable, of, throwError } from 'rxjs';
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { urlCategoria, urlMegusta, urlUpload, urlDisponible } from '../clases/urlglobales';
import { Router } from '@angular/router';
import { AuthService } from '../authorization/auth.service';
import swal from 'sweetalert2';
import { HttpRequest } from '@angular/common/http';
import { MeGusta } from '../clases/megusta';
import {
  urlBase,
  urlLista,
  urlPelicula,
  urlSave,
  urlPublica,
  urlDelete,
} from '../clases/urlglobales';

@Injectable({
  providedIn: 'root',
})
export class PeliculaService {
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  private httpHeadersFile = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {}

  agregarAutorizacionHeader(){
    const token = this.authService.obteniendoToken();
    if (token != null){
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    return this.httpHeaders;
  }

  agregarAutorizacionHeaderFile(){
    const token = this.authService.obteniendoToken();
    if (token != null){
      return this.httpHeadersFile.append('Authorization', 'Bearer ' + token);
    }
    return this.httpHeaders;
  }

  getPeliculasPage(page: number, sort: string, active: boolean): Observable<any> {
    return this.http.get(
      urlBase + urlPublica + urlLista + urlPelicula + page + '/' + sort + '/' + active )
      .pipe(
        map((response) => {
          return response;
        }), catchError(e => {
          console.log(e);
          if (e.status === 0){
            swal('Error', 'Al parecer no hay conexion con el servidor', 'error');
            this.router.navigate(['/login']);
          } else{
            swal('Error', 'Error con la solicitud requerida', 'warning');
            this.router.navigate(['/login']);
          }
          return throwError(e);
        })
        );
  }

  getPelicula(id: number): Observable<Pelicula> {
    return this.http.get(urlBase + urlPublica + urlPelicula + id).pipe(
      map((response) => {
        return response as Pelicula;
      }), catchError(e => {
        console.log(e);
        if (e.status === 0){
          swal('Error', 'Al parecer no hay conexion con el servidor', 'error');
          this.router.navigate(['/login']);
        } else{
          swal('Error', 'Error con la solicitud requerida', 'warning');
          this.router.navigate(['/peliculas']);
        }
        return throwError(e);
      })
      );
  }

  getPeliculaCategoria(id: number): Observable<Pelicula[]> {
    return this.http.get(urlBase + urlPublica + urlLista +urlPelicula + urlCategoria +  id).pipe(
      map((response: any) => {
        console.log(response)
        return response as Pelicula[];
      }), catchError(e => {
        console.log(e);
        if (e.status === 0){
          swal('Error', 'Al parecer no hay conexion con el servidor', 'error');
          this.router.navigate(['/login']);
        } else{
          swal('Error', 'Error con la solicitud requerida', 'warning');
          this.router.navigate(['/peliculas']);
        }
        return throwError(e);
      })
      );
  }

  getPeliculaLike(): Observable<MeGusta[]> {
    return this.http.get(urlBase + urlPublica + urlLista + urlMegusta ).pipe(
      map((response: any) => {
        console.log(response)
        return response as MeGusta[];
      }), catchError(e => {
        console.log(e);
        if (e.status === 0){
          swal('Error', 'Al parecer no hay conexion con el servidor', 'error');
          this.router.navigate(['/login']);
        } else{
          swal('Error', 'Error con la solicitud requerida', 'warning');
          this.router.navigate(['/peliculas']);
        }
        return throwError(e);
      })
      );
  }

  getPeliculaCoincidencias(name: string): Observable<Pelicula[]> {
    return this.http.get(urlBase + urlPublica + urlLista + urlPelicula + name ).pipe(
      map((response: any) => {
        console.log(response)
        return response as Pelicula[];
      }), catchError(e => {
        console.log(e);
        if (e.status === 0){
          swal('Error', 'Al parecer no hay conexion con el servidor', 'error');
          this.router.navigate(['/login']);
        } else{
          swal('Error', 'Error con la solicitud requerida', 'warning');
          this.router.navigate(['/peliculas']);
        }
        return throwError(e);
      })
      );
  }

  getPeliculasDisponibles(disponible: boolean): Observable<Pelicula[]> {
    return this.http.get(urlBase + urlPublica + urlLista + urlPelicula + urlDisponible + disponible ).pipe(
      map((response: any) => {
        console.log(response)
        return response as Pelicula[];
      }), catchError(e => {
        console.log(e);
        if (e.status === 0){
          swal('Error', 'Al parecer no hay conexion con el servidor', 'error');
          this.router.navigate(['/login']);
        } else{
          swal('Error', 'Error con la solicitud requerida', 'warning');
          this.router.navigate(['/peliculas']);
        }
        return throwError(e);
      })
      );
  }

  create(pelicula: Pelicula): Observable<Pelicula> {
    return this.http.post<Pelicula>(urlBase + urlSave + urlPelicula, pelicula, {
      headers: this.agregarAutorizacionHeader(), }).pipe(
        map((response) => {
          swal('Dato', 'Dato guardado con exito', 'success');
          return response;
        }),
        catchError(e => {
          if (e.status === 401){
            this.router.navigate(['/login']);
            swal('Error ', 'Acceso denegado', 'error');
          }else{
            swal('Error ', 'Error al guardar ' + e , 'error');
          }
          return throwError(e);
        })
      );
    }

  delete(id: number): Observable<Pelicula> {
    return this.http.delete<Pelicula>(urlBase + urlDelete + urlPelicula + id, {
      headers: this.agregarAutorizacionHeader(),
    }).pipe(
      catchError(e => {
        if (e.status === 401){
          this.router.navigate(['/login']);
          swal('Error ', 'Acceso denegado', 'error');
        }else{
          swal('Error ', 'Error al Eliminar ' + e , 'error');
        }
        return throwError(e);
      })
    );
  }

  subirFoto(archivo: File, pelicula ): Observable<Pelicula>{
    const formData: FormData = new FormData();
    formData.append('archivo', archivo);
    formData.append('pelicula', JSON.stringify(pelicula));

    const req = new HttpRequest('POST', urlBase + urlPublica +urlPelicula + urlUpload, formData, {
      reportProgress: true
    });

    return this.http.request(req).pipe(
      map((response: any) => {
        swal('Imagen ', 'Los datos fueron guardados con exito', 'success');
        return response.mensaje as Pelicula;
      }),
      catchError(e => {
        if (e.status === 401){
          this.router.navigate(['/login']);
          swal('Error ', 'Acceso denegado', 'error');
        }else{
          swal('Error ', 'Error al Guardar ' + e , 'error');
        }
        return throwError(e);
      })
    );
  }
}
