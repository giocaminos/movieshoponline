import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PeliculasComponent } from './peliculas/peliculas.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormpeliculaComponent } from './peliculas/formpelicula.component';
import { FormsModule } from '@angular/forms';
import { FormmetodopagoComponent } from './metodopago/formmetodopago.component';
import { FormclasificacionComponent } from './clasificaciones/formclasificacion.component';
import { FormcategoriaComponent } from './categorias/formcategoria.component';
import { FormrollusuarioComponent } from './rollusuario/formrollusuario.component';
import { CategoriaComponent } from './categorias/categoria.component';
import { RollusuarioComponent } from './rollusuario/rollusuario.component';
import { ClasificacionComponent } from './clasificaciones/clasificacion.component';
import { MetodopagoComponent } from './metodopago/metodopago.component';
import { LoginComponent } from './usuario/login.component';
import { RestableceComponent } from './usuario/restablece.component';
import { RegistroComponent } from './usuario/registro.component';
import { PerfilComponent } from './usuario/perfil.component';
import { DetallecomprasComponent } from './historial/detallecompras.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { DetalleComponent } from './detalle/detalle.component';
import { LoaderInterceptor } from './interceptors/interceptor';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { SpinnerComponent } from './spinner/spinner.component'
import { SpinnerService } from './servicios/spinner.service';


const routes: Routes = [
  { path: '', redirectTo: '/peliculas', pathMatch: 'full' },
  { path: 'peliculas', component: PeliculasComponent },
  { path: 'categorias', component: CategoriaComponent },
  { path: 'clasificaciones', component: ClasificacionComponent },
  { path: 'metodopagos', component: MetodopagoComponent },
  { path: 'rollusuario', component: RollusuarioComponent },
  { path: 'peliculas/form', component: FormpeliculaComponent },
  { path: 'peliculas/:disponibilidad', component: PeliculasComponent },
  { path: 'peliculas/coincidencias/:coincidencias', component: PeliculasComponent },
  { path: 'peliculas/populares/:populares', component: PeliculasComponent },
  { path: 'pelicula/detalle/:pelicula', component: DetalleComponent },
  { path: 'peliculas/catgoria/:categorias', component: PeliculasComponent },
  { path: 'peliculas/page/:page', component: PeliculasComponent },
  { path: 'peliculas/form/:id', component: FormpeliculaComponent },
  { path: 'categoria/form', component: FormcategoriaComponent },
  { path: 'categoria/form/:id', component: FormcategoriaComponent },
  { path: 'clasificacion/form', component: FormclasificacionComponent },
  { path: 'clasificacion/form/:id', component: FormclasificacionComponent },
  { path: 'rollusuario/form', component: FormrollusuarioComponent },
  { path: 'rollusuario/form/:id', component: FormrollusuarioComponent },
  { path: 'metodopago/nuevo', component: FormmetodopagoComponent },
  { path: 'metodopago/edicion/:id', component: FormmetodopagoComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout/:id', component: LoginComponent },
  { path: 'restablecer', component: RestableceComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'detallecompras', component: DetallecomprasComponent },
  { path: 'disponibilidad/:disponibilidad', component: PeliculasComponent },
];
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PeliculasComponent,
    FormpeliculaComponent,
    FormmetodopagoComponent,
    FormclasificacionComponent,
    FormcategoriaComponent,
    FormrollusuarioComponent,
    CategoriaComponent,
    RollusuarioComponent,
    ClasificacionComponent,
    MetodopagoComponent,
    LoginComponent,
    RestableceComponent,
    RegistroComponent,
    PerfilComponent,
    DetallecomprasComponent,
    PaginatorComponent,
    DetalleComponent,
    SpinnerComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    HttpClientModule,
    FormsModule,    
    BrowserAnimationsModule,
    RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload',
    initialNavigation: 'enabled'
})],
  providers: [
    SpinnerService,
    {provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
