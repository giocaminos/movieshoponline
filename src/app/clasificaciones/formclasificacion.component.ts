import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Clasificacion } from '../clases/clasificacion';
import swal from 'sweetalert2';
import { ClasificacionService } from '../servicios/clasificacion.service';

@Component({
  selector: 'app-formclasificacion',
  templateUrl: './formclasificacion.component.html',
})
export class FormclasificacionComponent implements OnInit {
  clasificacion: Clasificacion = new Clasificacion();
  btnNombre = 'Nueva Registro';
  constructor(
    private router: Router,
    private clasificacionService: ClasificacionService,
    private activatedRouter: ActivatedRoute) {}

  ngOnInit(): void {
    this.cargar();
  }

  public create(): void {
    if (this.clasificacion.id == undefined) {
      this.clasificacion.id = null;
    }
    this.clasificacionService.create(this.clasificacion).subscribe(
      obj => this.clasificacion = obj
    );
    this.ngOnInit();
    this.router.navigate(['/clasificaciones']);
    swal('Nuevo Registro', 'Datos Guardados con exito ' + this.clasificacion.descripcion, 'success');
  }

  cargar(): void {
    this.activatedRouter.params.subscribe(
      params => {
        let id = params['id']
        if(id){
          this.btnNombre = 'Editar Registtro';
          this.clasificacionService.getClasificacion(id).subscribe(
            obj => this.clasificacion = obj
          );
        }
      }
    );
  }
}