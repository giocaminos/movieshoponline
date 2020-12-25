import { Pelicula } from './pelicula';
import { Usuario } from './usuario';

export class MeGusta {
  id: number;
  meGusta: boolean;
  fechaLike: Date;
  idPelicula: Pelicula = new Pelicula();
  idUsuario: Usuario = new Usuario();
}
