import { Component, OnInit } from '@angular/core';
import { Usuario } from '../clases/usuario';
import { UsuarioService } from '../servicios/usuario.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { MetodopagoService } from '../servicios/metodopago.service';
import { MetodoPago } from '../clases/metodopago';
import { Billetera } from '../clases/billetera';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html'
})
export class RegistroComponent implements OnInit {

  usuario: Usuario = new Usuario();
  metodoPagos: MetodoPago[] = new Array();
  metodoPago: MetodoPago = new MetodoPago();
  billetera: Billetera = new Billetera();
  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private metodopagoService: MetodopagoService) { }

  ngOnInit(): void {
    this.metodopagoService.getMetodopagos().subscribe(
      obj => this.metodoPagos = obj
    );
  }

  create(){
    this.billetera.idUsuario.id = null;

    if(this.billetera.idMetodoPago.id != null && this.billetera.idUsuario.email != null
      && this.billetera.idUsuario.nombre != null && this.billetera.idUsuario.apellido != null
      && this.billetera.idUsuario.contrasena != null && this.billetera.tarjeta != null
      && this.billetera.cvv != null ){
        this.usuarioService.createBilletera(this.billetera).subscribe(
          obj => this.billetera = obj
        );
        this.ngOnInit();
        this.router.navigate(['/login']);
        swal('Nuevo Registro', 'Usuario creado con exito ', 'success');
    } else{
      swal('Nota', 'Todos los campos son requeridos para el registro ', 'warning');
    }
  }
}
