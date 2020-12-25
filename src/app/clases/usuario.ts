import { Billetera } from './billetera';
export class Usuario {
  id: number;
  activo: boolean;
  nombre: string;
  apellido: string;
  contrasena: string;
  email: string;  
  telefono: number;
  tipoEnvioJWT: string;
}
