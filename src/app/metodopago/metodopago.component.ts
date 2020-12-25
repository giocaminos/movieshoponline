import { Component, OnInit, SimpleChanges } from '@angular/core';
import { MetodoPago } from '../clases/metodopago';
import { MetodopagoService } from '../servicios/metodopago.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-metodopago',
  templateUrl: './metodopago.component.html'
})
export class MetodopagoComponent implements OnInit {

  metodopagos: MetodoPago[];

  constructor(private metodopagoService: MetodopagoService) {
    console.log('constructor');
   this.ngOnInit();
   }

  ngOnInit(): void {
    console.log('onInit');
    this.metodopagoService.getMetodopagos().subscribe(
      metodopagos => this.metodopagos = metodopagos
    );
  }  

  delete(metodoPago: MetodoPago): void {
    Swal.fire({
      title: 'Estas Seguro?',
      text: '¿Seguro de eliminar este registro?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if (result.value) {
        this.metodopagoService.delete(metodoPago.id).subscribe(
          respose => {
              this.metodopagos = this.metodopagos.filter(cat => cat !== metodoPago);
              Swal('Eliminado!', 'El registro ha sido borrado con exito.', 'success');
          }
        );
      }
    });
  }
}
