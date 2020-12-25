import { Component, OnInit } from '@angular/core';
import { Categoria } from '../clases/categoria';
import { Pelicula } from '../clases/pelicula';
import { PeliculaService } from '../servicios/pelicula.service';
import { CategoriasService } from '../servicios/categorias.service';
import { ClasificacionService } from '../servicios/clasificacion.service';
import { Clasificacion } from '../clases/clasificacion';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-formpelicula',
  templateUrl: './formpelicula.component.html'
})
export class FormpeliculaComponent implements OnInit {

  pelicula: Pelicula = new Pelicula();

  categorias: Categoria[];
  Categoria: Categoria = new Categoria();

  clasificaciones: Clasificacion[];
  clasificacion: Clasificacion = new Clasificacion();

  btnNombre = 'Nuevo Registro';
  
  fotoSelecionada: File;
  constructor(
    private peliculaService: PeliculaService,
    private categoriasService: CategoriasService,
    private clasificacionService: ClasificacionService,
    private activatedRouter: ActivatedRoute) {}

  ngOnInit(): void {

    this.categoriasService.getCategorias().subscribe(
      categorias => this.categorias = categorias
    );

    this.clasificacionService.getClasificaciones().subscribe(
      clasificaciones => this.clasificaciones = clasificaciones
    );
    this.cargar();
  }

  public create(): void {
    this.peliculaService.create(this.pelicula).subscribe(
      obj => this.pelicula = obj
    );
  }

  compararClasificacion(o1: Clasificacion, o2: Clasificacion){
    return o1 === null || o2 === null ? false : o1.id === o2.id;
  }

  compararCategoria(o1: Categoria, o2: Categoria){
    return o1 === null || o2 === null ? false : o1.id === o2.id;
  }

  cargar(): void {
    this.activatedRouter.params.subscribe(
      params => {
        const id = params['id']
        if (id){
          this.btnNombre = 'Editar Registtro';
          this.peliculaService.getPelicula(id).subscribe(
            obj => this.pelicula = obj
          );
        }
      }
    );
  }

 seleccionarFoto(event){
  this.fotoSelecionada = event.target.files[0];
  console.log(this.fotoSelecionada);
 }

 subirFoto(){
  this.peliculaService.subirFoto(this.fotoSelecionada, this.pelicula).subscribe(
    obj => {
      this.pelicula = obj;
    }
  );
 }
}

