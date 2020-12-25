import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MetodoPago } from '../clases/metodopago';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  urlBase,
  urlMetodopago,
  urlLista,
  urlPublica,
  urlSave,
  urlDelete,
} from '../clases/urlglobales';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../authorization/auth.service';

@Injectable({
  providedIn: 'root',
})
export class MetodopagoService {
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {}

  agregarAutorizacionHeader(){
    const token = this.authService.obteniendoToken();
    if (token != null){
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    return this.httpHeaders;
  }

  getMetodopagos(): Observable<MetodoPago[]> {
    console.log('metodo de pago');
    return this.http.get(urlBase + urlPublica + urlLista + urlMetodopago).pipe(
      map((response) => {
        return response as MetodoPago[];
      })
    );
  }

  getMetodoPago(id: number): Observable<MetodoPago> {
    console.log('metodo de poago id: '+id);
    return this.http.get(urlBase + urlPublica + urlMetodopago + id).pipe(
      map((response) => {
        return response as MetodoPago;
      })
    );
  }
  create(metodoPago: MetodoPago): Observable<MetodoPago> {
    return this.http.post<MetodoPago>(
      urlBase + urlSave + urlMetodopago,
      metodoPago,
      { headers: this.agregarAutorizacionHeader() }
    );
  }

  delete(id: number): Observable<MetodoPago> {
    return this.http.delete<MetodoPago>(
      urlBase + urlDelete + urlMetodopago + id,
      { headers: this.agregarAutorizacionHeader() }
    );
  }
}
