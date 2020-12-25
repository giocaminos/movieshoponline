import { Component, OnInit } from '@angular/core';
import { MetodoPago } from '../clases/metodopago';
import { ActivatedRoute, Router } from '@angular/router';
import { MetodopagoService } from '../servicios/metodopago.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-formmetodopago',
  templateUrl: './formmetodopago.component.html'
})
export class FormmetodopagoComponent implements OnInit {
  btnNombre = 'Nuevo Registro';
  metodopago: MetodoPago = new MetodoPago();
  constructor(
    private activatedRouter: ActivatedRoute, 
    private metodopagoService: MetodopagoService,
    private router: Router) { }

  ngOnInit(): void {
    this.cargar();
  }

  public create(): void {
    if (this.metodopago.id === undefined) {
      this.metodopago.id = null;
    }
    this.metodopagoService.create(this.metodopago).subscribe(
      obj => {
        this.metodopago = obj;
    }
    );
    this.router.navigate(['/metodopagos']);
    swal('Nuevo Registro', 'Datos Guardados con exito ' + this.metodopago.descripcion, 'success');
  }

  cargar(): void {
    this.activatedRouter.params.subscribe(
      params => {
        let id = params['id']
        console.log('id de metodo de pago: '+id);
        if(id){
          this.btnNombre = 'Editar Registtro';
          this.metodopagoService.getMetodoPago(id).subscribe(
            metodo => this.metodopago = metodo
          );
        }
      }
    );
  }
}

