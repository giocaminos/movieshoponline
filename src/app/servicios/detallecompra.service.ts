import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { DetalleCompra } from '../clases/detallecompra';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../authorization/auth.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { urlUsuario, urlDevolucion, urlPelicula } from '../clases/urlglobales';
import {
  urlBase,
  urlLista,
  urlDetalleCompra,
  urlSave,
  urlDelete,
  urlPublica,
} from '../clases/urlglobales';

@Injectable({
  providedIn: 'root',
})
export class DetallecompraService {
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {}

  agregarAutorizacionHeader(){
    const token = this.authService.obteniendoToken();
    if (token != null){
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    return this.httpHeaders;
  }

  getDetalleCompras(): Observable<DetalleCompra[]> {
    return this.http.get(urlBase + urlLista + urlDetalleCompra,
      { headers: this.agregarAutorizacionHeader() }).pipe(
      map((response) => {
        console.log(response);
        return response as DetalleCompra[];
      })
    );
  }

  getDetalleComprasPendienteRenta(): Observable<DetalleCompra[]> {
    return this.http.get(urlBase + urlLista + urlDevolucion + urlPelicula,
      { headers: this.agregarAutorizacionHeader() }).pipe(
      map((response) => {
        console.log(response);
        return response as DetalleCompra[];
      })
    );
  }

  getDetalleCompra(id: number): Observable<DetalleCompra> {
    return this.http.get(urlBase + urlPublica + urlDetalleCompra + id).pipe(
      map((response) => {
        return response as DetalleCompra;
      })
    );
  }

  getDetalleCompraUsuario(email: string): Observable<DetalleCompra[]> {
    return this.http.get(urlBase + urlLista + urlDetalleCompra + urlUsuario + email,
      { headers: this.agregarAutorizacionHeader() }).pipe(
      map((response) => {
        return response as DetalleCompra[];
      })
    );
  }

  create(detalleCompra: DetalleCompra, tipo: string): Observable<DetalleCompra> {
    return this.http.post<DetalleCompra>(
      urlBase + urlSave + urlDetalleCompra + tipo, detalleCompra,
      { headers: this.agregarAutorizacionHeader() }
    ).pipe(
      map((response: any) => {
        const r = response.detalleCompra as DetalleCompra;
        console.log('mora: ' + r.montoMora);
        if(tipo === 'devolucionrenta'){
          if(r.montoMora != null){
            Swal('Exito', 'La devolucion genero cargo adicional por mora de entrega de: $'+r.montoMora, 'warning');
          } else{
            Swal('Exito', 'La devolucion no genero ningun cargo adicional', 'success');
          }          
        }else{
          this.router.navigate(['/peliculas']);
        Swal('Exito', 'Gracias por ' + tipo + ' esperamos a que disfrutes el contenido de la pelicula!', 'success');
        }        
        return response;
      }),
      catchError(e => {
        if (e.status === 401){
          Swal('Hola!!!',
          'Para Poder Alquilar o Comprar, es necesario iniciar session, si no tienes una cuenta, puedes registrate', 'info');
        }else{
          console.log(e);
          Swal('Error ', 'Error al Guardar', 'error');
        }
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<DetalleCompra> {
    return this.http.delete<DetalleCompra>(
      urlBase + urlDelete + urlDetalleCompra + id,
      { headers: this.agregarAutorizacionHeader() }
    );
  }
}
