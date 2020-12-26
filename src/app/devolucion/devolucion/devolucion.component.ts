import { Component, OnInit, SimpleChanges } from '@angular/core';
import { DetalleCompra } from 'src/app/clases/detallecompra';
import { DetallecompraService } from '../../servicios/detallecompra.service';

@Component({
  selector: 'app-devolucion',
  templateUrl: './devolucion.component.html'
})
export class DevolucionComponent implements OnInit {

  detalleCompras: DetalleCompra[] = new Array();

  constructor(private detallecompraService: DetallecompraService) { }

  ngOnInit(): void {
    this.detallecompraService.getDetalleComprasPendienteRenta().subscribe(
      obj => {
        console.log(obj);
        this.detalleCompras = obj;
      }
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('cambio');
  }
  entregar(d: DetalleCompra){
    console.log(d);
    this.detallecompraService.create(d,'devolucionrenta').subscribe(
      respuesta =>{   
        this.ngOnInit();        
      }
    );
  }
}
