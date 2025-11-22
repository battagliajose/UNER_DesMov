export type TipoRegistro = 'Entrada' | 'Salida';
export type Modalidad = 'presencial' | 'remoto';

export interface IRegistro {
  id: string;
  tipo: TipoRegistro;
  fecha: Date;
  modalidad?: Modalidad;
  latitud?: number;
  longitud?: number;
}

export interface IUser {
  id: string;
  nombre: string;
  apellido: string;
  dni: string;
  email: string;
  foto?: string;
}

export default class User implements IUser {
  id: string;
  nombre: string;
  apellido: string;
  dni: string;
  email: string;
  foto?: string;

  constructor(
    id: string,
    nombre: string,
    apellido: string,
    dni: string,
    email: string,
    foto?: string,
  ) {
    this.id = id;
    this.nombre = nombre;
    this.apellido = apellido;
    this.dni = dni;
    this.email = email;
    this.foto = foto;
  }
}
