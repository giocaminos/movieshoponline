import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Pelicula } from '../clases/pelicula';
import { PeliculaService } from '../servicios/pelicula.service';
import { ActivatedRoute } from '@angular/router';
import { CategoriasService } from '../servicios/categorias.service';
import { Categoria } from '../clases/categoria';
import { AuthService } from '../authorization/auth.service';
import { MeGusta } from '../clases/megusta';
import swal from 'sweetalert2';
import { MeGustaService } from '../servicios/megusta.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-peliculas',
  templateUrl: './peliculas.component.html',
})
export class PeliculasComponent implements OnInit, OnChanges {
  peliculas: Pelicula[] = new Array();
  categoria: Categoria = new Categoria();
  titulo = 'Lista de Peliculas';
  megust: MeGusta = new MeGusta();
  megustan: MeGusta[] = new Array();
  idUsuario: number;
  paginadorPapa: any;
  regInteger = /^\d+$/;
  toString = Object.prototype.toString;
  constructor(
    private peliculaService: PeliculaService,
    private activatedRouter: ActivatedRoute,
    private categoriasService: CategoriasService,
    public authService: AuthService,
    private meGustaService: MeGustaService
  ) {}

  ngOnInit(): void {
    this.activatedRouter.paramMap.subscribe((param) => {
      let page: number = +param.get('page');
      const coincidencias: string = param.get('coincidencias');
      const populares: string = param.get('populares');
      const categorias = +param.get('categorias');
      const disponibilidad: string = param.get('disponibilidad');
      if (coincidencias) {
        this.titulo = 'Peliculas que coinciden';
        this.peliculaService
          .getPeliculaCoincidencias(coincidencias)
          .subscribe((obj) => (this.peliculas = obj));
        console.log('coincidencias ');
      } else if (categorias) {
        this.categoriasService
          .getCategoria(categorias)
          .subscribe((respuesta) => {
            this.categoria = respuesta;
            this.titulo = 'Categoria: ' + this.categoria.descripcion;
          });
        this.peliculaService
          .getPeliculaCategoria(categorias)
          .subscribe((obj) => (this.peliculas = obj));
        console.log('categorias ');
      } else if (populares) {
        this.titulo = 'Las mas populares';
        this.peliculaService
          .getPeliculaLike()
          .subscribe((obj) => {
             obj.forEach(id => this.peliculas.push(id.idPelicula));
          });
        console.log('populares ');
      } else if (disponibilidad) {
        this.titulo =
          'Peliculas ' + (disponibilidad === 'false' ? 'No disponibles' : 'Disponibles');
        this.peliculaService
          .getPeliculasDisponibles(disponibilidad === 'false' ? false : true)
          .subscribe((obj) => (this.peliculas = obj));
        console.log('indisponibilidad ');
      } else {
        if (!page){
          page = 0;
        }
        console.log('pagina ' + page);
        this.titulo = 'Lista de todas las peliculas';
        this.peliculaService
          .getPeliculasPage(page, 'titulo', true)
          .subscribe((response) => {
            this.peliculas = response.content as Pelicula[];
            this.paginadorPapa = response;
          });
        console.log('todas ');
      }
    });
  }

  ngOnChanges() {

  }


  megusta(obj: Pelicula) {
    this.idUsuario = this.authService.obtenerdatosTokenPayloadStorage().id;
    if (this.idUsuario != null) {
      this.megust.idUsuario.id = this.idUsuario;
      this.megust.idPelicula.id = obj.id;
      console.log(this.megust);
      this.meGustaService.create(this.megust).subscribe((respuesta) => {
        if (respuesta) {
          swal(
            'Te gusta!',
            'te invitamos a que alquiles la pelicula ' + obj.titulo,
            'info'
          );
        } else {
          swal(
            'Te gusta!',
            'solo una vez es posible dar me gusta a la pelicula ' + obj.titulo,
            'info'
          );
        }
      });
    } else {
      swal(
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
        this.peliculas = this.peliculas.filter((obj) => obj !== pelicula);
        Swal('Eliminacion', 'El registro fue eliminado con exito', 'success');
      }
    });
  }

  isInteger(str) {
    return this.regInteger.test(str);
  }

  isString(obj) {
    return toString.call(obj) === '[object String]';
  }
}
