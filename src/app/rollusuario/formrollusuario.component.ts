import { Component, OnInit } from '@angular/core';
import { RollusuarioService } from '../servicios/rollusuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Roll } from '../clases/roll';
import { RollService } from '../servicios/roll.service';
import { RollUsuario } from '../clases/rollusuario';
import swal from 'sweetalert2';

@Component({
  selector: 'app-formrollusuario',
  templateUrl: './formrollusuario.component.html'
})
export class FormrollusuarioComponent implements OnInit {

  btnNombre = 'Nueva Registro';
  rolles: Roll[];
  rollusuario: RollUsuario = new RollUsuario();
  constructor(
    private activatedRouter: ActivatedRoute,
    private rollusuarioService: RollusuarioService,
    private rollService: RollService,
    private router: Router) {}

  ngOnInit(): void {
    this.cargar();
  }

  public create(): void {
    this.rollusuarioService.create(this.rollusuario).subscribe(
      obj => this.rollusuario = obj
    );
    this.ngOnInit();
    this.router.navigate(['/rollusuario']);
    swal('Nuevo Registro', 'Datos Guardados con exito ', 'success');
  }

  cargar(): void {
    this.rollService.getRolles().subscribe(
      obj => this.rolles = obj
    );

    this.activatedRouter.params.subscribe(
      params => {
        const id = params['id']
        if (id){
          this.btnNombre = 'Editar Registtro';
          this.rollusuarioService.getRollUsuario(id).subscribe(
            obj => this.rollusuario = obj
          );
        }
      }
    );
  }

  comparar(o1: Roll, o2: Roll){
    return o1 === null || o2 === null ? false : o1.id === o2.id;
  }
}
