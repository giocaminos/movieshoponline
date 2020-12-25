import { Usuario } from './usuario';
import { MetodoPago } from './metodopago';

export class Billetera {
  id: number;
  tarjeta: string;
  cvv: number;
  idMetodoPago: MetodoPago = new MetodoPago();
  idUsuario: Usuario = new Usuario();
  predeterminado: boolean;
}
