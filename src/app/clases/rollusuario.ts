import { Usuario } from './usuario';
import { Roll } from './roll';

export class RollUsuario {
    id: number;
    idUsuario: Usuario = new Usuario();
    idRoll: Roll = new Roll();
}
