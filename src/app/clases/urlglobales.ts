import { HttpHeaders } from '@angular/common/http';

//export const urlBase = 'https://moveshop.herokuapp.com/API/';
//export const urlLogin = 'https://moveshop.herokuapp.com/oauth/token';

export const urlBase = 'http://localhost:8080/API/';
export const urlLogin = 'http://localhost:8080/oauth/token';

//export const urlBaseImagen = 'https://moveshop.herokuapp.com/uploads/';
//export const urlBaseImagen = 'http//:localhost:8080/API/uploads/';

export const urlLista = 'list/';
export const urlSave = 'save/';
export const urlDelete = 'delete/';
export const urlPublica = 'public/';
export const urlRegistro = 'registro/';
export const urlUpload = 'upload/';
export const urlDisponible = 'disponible/';
export const urlDevolucion = 'devolucion/';

export const urlBilletera = 'billetera/';
export const urlCategoria = 'categoria/';
export const urlClasificacion = 'clasificacion/';
export const urlDetalleCompra = 'detalleCompra/';
export const urlMegusta = 'megusta/';
export const urlMetodopago = 'metodopago/';
export const urlPelicula = 'pelicula/';
export const urlRoll = 'roll/';
export const urlRollusuario = 'rollusuario/';
export const urlUsuario = 'usuario/';
export const urlPassword = 'password/';
export const urlReset = 'reset/';
export const httpHeadersJSON = new HttpHeaders({
  'Content-Type': 'application/json',
});

const credenciales = btoa('angularapp' + ':' + 'password');
export const httpHeadersLogin = new HttpHeaders({
  'Content-Type': 'application/x-www-form-urlencoded',
  Authorization: 'Basic ' + credenciales,
});
