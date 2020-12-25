import { Categoria } from './categoria';
import { Clasificacion } from './clasificacion';

export class Pelicula {
  id: number;
  titulo: string;
  descripcion: string;
  imagen: string;
  activo: boolean;
  url: string;
  stock: number;
  montoNormal: number;
  montoMora: number;
  iva: number;
  montoAdicionalEstreno: number;
  fechaInicioEstreno: Date;
  fechaFinEstreno: Date;
  montoPelicula: number;
  idCategoria: Categoria = new Categoria();
  idClasificacion: Clasificacion = new Clasificacion();
}
