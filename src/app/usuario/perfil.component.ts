import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../servicios/usuario.service';
import { MetodopagoService } from '../servicios/metodopago.service';
import { BilleteraService } from '../servicios/billetera.service';
import { Router } from '@angular/router';
import { AuthService } from '../authorization/auth.service';
import { Usuario } from '../clases/usuario';
import { Billetera } from '../clases/billetera';
import { MetodoPago } from '../clases/metodopago';
import { TOCKEN } from '../clases/tocken';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html'
})
export class PerfilComponent implements OnInit {

  usuario: Usuario = new Usuario();
  billetera: Billetera = new Billetera();
  billeteras: Billetera[];
  metodoPago: MetodoPago[];
  payload: TOCKEN = new TOCKEN();
  constructor(
    private usuarioService: UsuarioService,
    private metodopagoService: MetodopagoService,
    private billeteraService: BilleteraService,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.payload = this.authService.obtenerdatosTokenPayloadStorage();
    this.billeteraService.getMyBilletera(this.payload.user_name).subscribe(
      obj => {
        this.billetera = obj;
        console.log(JSON.stringify(this.billetera));
      }
    );
  }

}
