import { Component, OnInit } from '@angular/core';
import { RollUsuario } from '../clases/rollusuario';
import { RollusuarioService } from '../servicios/rollusuario.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-rollusuario',
  templateUrl: './rollusuario.component.html'
})
export class RollusuarioComponent implements OnInit {

  rollusuarios: RollUsuario[];

  constructor(private rollusuarioService: RollusuarioService) { 
    this.ngOnInit();
  }

  ngOnInit(): void {
    this.rollusuarioService.getRollUsuarios().subscribe(
      rollusuarios => this.rollusuarios = rollusuarios
    );
  }

  delete(rollUsuario: RollUsuario): void {
    Swal.fire({
      title: 'Estas Seguro?',
      text: '¿Seguro de eliminar este registro?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar',
      cancelButtonText: 'No, Cancelar',
    }).then((result) => {
      if (result.value) {
        this.rollusuarioService.delete(rollUsuario.id).subscribe(
          respose => {
              this.rollusuarios = this.rollusuarios.filter(cat => cat !== rollUsuario);
              Swal('Eliminado!', 'El registro ha sido borrado con exito.', 'success');
          }
        );
      }
    });
  }
}

