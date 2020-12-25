import { Component, OnInit } from '@angular/core';
import { ClasificacionService } from '../servicios/clasificacion.service';
import { Clasificacion } from '../clases/clasificacion';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-clasificacion',
  templateUrl: './clasificacion.component.html'
})
export class ClasificacionComponent implements OnInit {

  clasificaciones: Clasificacion[];

  constructor(private clasificacionService: ClasificacionService) { 
    this.ngOnInit();
  }

  ngOnInit(): void {
    this.clasificacionService.getClasificaciones().subscribe(
      clasificaciones => this.clasificaciones = clasificaciones
    );
  }

  delete(clasificacion: Clasificacion): void {
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
        this.clasificacionService.delete(clasificacion.id).subscribe();
        this.clasificaciones = this.clasificaciones.filter(obj => obj !== clasificacion);
        Swal('Eliminacion', 'El registro fue eliminado con exito', 'success');
      }
    });
  }
}

