import { Component, Input, OnInit, Output } from '@angular/core';
import { Categoria } from '../clases/categoria';
import { CategoriasService } from '../servicios/categorias.service';
import { AuthService } from '../authorization/auth.service';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  title = 'Angular';
  aplication = 'PeluclasPlus';
  autenticado: boolean;
  categorias: Categoria[];
  search: string;
  constructor(
    private categoriasService: CategoriasService,
    public authService: AuthService,
    private router: Router
  ) {  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit(): void {
    this.categoriasService
      .getCategorias()
      .subscribe((categorias) => (this.categorias = categorias));
  }

  logout(){
    console.log('logoaut en header');
    sessionStorage.clear();
    this.router.navigate(['/login']);
    swal('Session', 'has cerrado session con exito', 'success');
  }

  
}
