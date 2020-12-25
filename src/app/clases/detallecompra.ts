import { Pelicula } from './pelicula';
import { Usuario } from './usuario';

export class DetalleCompra {
  id: number;
  fechaCompra: Date;
  fechaFinRenta: Date;
  montoNormal: number;
  iva: number;
  montoMora: number;
  fechaEntregaPelicula: Date;
  metodoPago: string;
  tarjeta: string;
  ticket: string;
  idPelicula: Pelicula = new Pelicula();
  idUsuario: Usuario = new Usuario();
  montoPelicula: number;
  montoAdicionalEstreno: number;
}
