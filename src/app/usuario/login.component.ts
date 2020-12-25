import { Component, OnInit } from '@angular/core';
import { Usuario } from '../clases/usuario';
import swal from 'sweetalert2';
import { AuthService } from '../authorization/auth.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  titulo = 'Iniciar secion';
  usuario: Usuario = new Usuario();
  public preloaderHide: boolean;
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    
  }
  
  login(): void {
    console.log(this.usuario);
    this.preloaderHide =true;
    if (
      this.usuario.email != null ||
      this.usuario.contrasena != null ||
      this.usuario.email != undefined ||
      this.usuario.contrasena != undefined
    ) { 
    console.log(this.usuario);
    this.authService.login(this.usuario).subscribe(
      (response) => {
        this.authService.guardarToken(response.access_token);
        swal('Login', 'Inicio de sesion con exito!', 'success');
        this.router.navigate(['/peliculas']);
      },
      (err) => {
        if (err.status == 400) {
          swal('Error', 'Usuario o contraseña invalidos!', 'error');
        }
      }
    );
  }else{
    swal('Hola!', 'Los campos no deven de estar vacios!', 'info');
  }
} 
}
