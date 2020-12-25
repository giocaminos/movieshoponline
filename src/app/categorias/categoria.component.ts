import { Component, OnInit } from '@angular/core';
import { Categoria } from '../clases/categoria';
import { CategoriasService } from '../servicios/categorias.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';




@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
})
export class CategoriaComponent implements OnInit {
  categorias: Categoria[];

  constructor(public categoriasService: CategoriasService) {
    this.ngOnInit();
  }

  ngOnInit(): void {
    this.categoriasService
      .getCategorias()
      .subscribe((categorias) => (this.categorias = categorias));
  }

  delete(categoria: Categoria): void {
    Swal({
      title: 'Estas Seguro?',
      text: '¿Seguro de eliminar este registro?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    }).then( (result) => {
      if (result.value) {
        this.categoriasService.delete(categoria.id).subscribe();
        this.categorias = this.categorias.filter(obj => obj !== categoria);
        Swal('Eliminacion', 'El registro fue eliminado con exito', 'success');
      }
    });
  }
}
