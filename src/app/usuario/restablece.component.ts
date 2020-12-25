import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { Usuario } from '../clases/usuario';
import { UsuarioService } from '../servicios/usuario.service';


@Component({
  selector: 'app-restablece',
  templateUrl: './restablece.component.html'
})
export class RestableceComponent implements OnInit {

  usuario: Usuario = new Usuario();
  tocken: string;
  titulo = 'Restablecer Contraseña';
  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
  }

  enviar(tipoEnvioJWT: string){
    this.usuario.tipoEnvioJWT = tipoEnvioJWT;
    console.log(this.usuario);
    if(this.usuario.email != null){
       this.usuarioService.enviarAlCorreoTocken(this.usuario).subscribe(
      obj => console.log(obj)
    );
    }else{
      swal('Requerido','El campo es requerido para el enviar del mensaje','info');
    }  
  }

  cambiar(){
    console.log(this.usuario);
    if(this.usuario.email != null && this.usuario.contrasena != null && this.tocken != null){
      this.usuarioService.enviarReset(this.usuario, this.tocken).subscribe(
        obj => console.log(obj)
      );
   }else{
     swal('Requerido','Los campos de correo, contraseña y token son requeridos para el envio del mensaje','info');
   }  
    
  }

}
