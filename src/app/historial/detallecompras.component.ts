import { Component, OnInit } from '@angular/core';
import { AuthService } from '../authorization/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DetallecompraService } from '../servicios/detallecompra.service';
import { DetalleCompra } from '../clases/detallecompra';
import { TOCKEN } from '../clases/tocken';

@Component({
  selector: 'app-detallecompras',
  templateUrl: './detallecompras.component.html',
})
export class DetallecomprasComponent implements OnInit {
  detalleCompras: DetalleCompra[] = new Array();
  tocken: TOCKEN;

  constructor(
    private authService: AuthService,
    private router: Router,
    private detallecompraService: DetallecompraService,
    private activatedRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.tocken = this.authService.obtenerdatosTokenPayloadStorage();

    if (this.authService.hasRole('ROLE_ADMIN')) {
      this.detallecompraService.getDetalleCompras().subscribe((obj) => {
        this.detalleCompras = obj;
        console.log('administrador '+ this.detalleCompras);
      });
    } else {
      this.detallecompraService
        .getDetalleCompraUsuario(this.tocken.user_name)
        .subscribe((obj) => {
          this.detalleCompras = obj;
          console.log('usuario normal ' + JSON.stringify(this.detalleCompras));
        });
    }
  }
}
