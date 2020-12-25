import { Component, OnInit } from '@angular/core';
import { Categoria } from '../clases/categoria';
import swal from 'sweetalert2'
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriasService } from '../servicios/categorias.service';

@Component({
  selector: 'app-formcategoria',
  templateUrl: './formcategoria.component.html',
})
export class FormcategoriaComponent implements OnInit {
  categoria: Categoria = new Categoria();
  btnNombre = 'Nueva Registro';
  constructor(
    private activatedRouter: ActivatedRoute,
    private categoriasService: CategoriasService,
    private router: Router) {}

  ngOnInit(): void {
    this.cargar();
  }

  public create(): void {
    if (this.categoria.id == undefined) {
      this.categoria.id = null;
    }
    this.categoriasService.create(this.categoria).subscribe(
      cat => this.categoria = cat
    );
    this.router.navigate(['/categorias']);
    this.ngOnInit();
    swal('Nuevo Registro', 'Datos Guardados con exito ' + this.categoria.descripcion, 'success');
  }

  cargar(): void {
    this.activatedRouter.params.subscribe(
      params => {
        let id = params['id']
        if(id){
          this.btnNombre = 'Editar Registtro';
          this.categoriasService.getCategoria(id).subscribe(
            categoria => this.categoria = categoria
          );
        }
      }
    );
  }
}
