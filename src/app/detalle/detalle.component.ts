import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { AuthService } from '../authorization/auth.service';
import { PeliculaService } from '../servicios/pelicula.service';
import { MeGustaService } from '../servicios/megusta.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Pelicula } from '../clases/pelicula';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { MeGusta } from '../clases/megusta';
import { Categoria } from '../clases/categoria';
import { DetallecompraService } from '../servicios/detallecompra.service';
import { DetalleCompra } from '../clases/detallecompra';
import { TOCKEN } from '../clases/tocken';
import swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html'
})
export class DetalleComponent implements OnInit, OnChanges  {

  pelicula: Pelicula = new Pelicula();
  idUsuario: number;
  categoria: Categoria = new Categoria();
  titulo: string;
  megust: MeGusta = new MeGusta();
  detalleCompra: DetalleCompra = new DetalleCompra();
  tocken: TOCKEN = new TOCKEN();
  constructor(
    public authService: AuthService,
    private peliculaService: PeliculaService,
    private activatedRouter: ActivatedRoute,
    private meGustaService: MeGustaService,
    private router: Router,
    private detallecompraService: DetallecompraService) { }

  ngOnChanges(changes: SimpleChanges): void {

  }

  ngOnInit(): void {
    this.activatedRouter.paramMap.subscribe((param) => {
      const idPelicula: number = +param.get('pelicula');
      if (idPelicula) {
        this.peliculaService.getPelicula(idPelicula).subscribe(
          obj => this.pelicula = obj
        );
      }
    });
  }

  megusta(obj: Pelicula) {
    this.idUsuario = this.authService.obtenerdatosTokenPayloadStorage().id;
    if (this.idUsuario != null) {
      this.megust.idUsuario.id = this.idUsuario;
      this.megust.idPelicula.id = obj.id;
      console.log(this.megust);
      this.meGustaService.create(this.megust).subscribe((respuesta) => {
        if (respuesta) {
          Swal(
            'Te gusta!',
            'te invitamos a que alquiles la pelicula ' + obj.titulo,
            'info'
          );
        } else {
          Swal(
            'Te gusta!',
            'solo una vez es posible dar megusta a la pelicula ' + obj.titulo,
            'info'
          );
        }
      });
    } else {
      Swal(
        'Te gusta',
        'Tienes que iniciar session para poder dar en el boton megusta',
        'question'
      );
    }
  }

  delete(pelicula: Pelicula): void {
    Swal({
      title: 'Estas Seguro?',
      text: '¿Seguro de eliminar este registro?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!',
    }).then((result) => {
      if (result.value) {
        this.peliculaService.delete(pelicula.id).subscribe();
        this.router.navigate(['/login']);
        Swal('Eliminacion', 'El registro fue eliminado con exito', 'success');
      }
    });
  }

  comprar(tipo: string){
    this.tocken = this.authService.obtenerdatosTokenPayloadStorage();
    this.detalleCompra.idPelicula.id = this.pelicula.id;
    this.detalleCompra.idUsuario.id = this.tocken.id;
    console.log(this.detalleCompra.idPelicula.id);
    console.log(this.detalleCompra.idUsuario.id);
    console.log(tipo);
    this.detallecompraService.create(this.detalleCompra, tipo).subscribe(
        obj => this.detalleCompra = obj
      );
  }
}
