export type TipoRegistro = 'ingreso' | 'egreso';
export type Modalidad = 'presencial' | 'remoto';

export interface IRegistro {
  id: string;
  tipo: TipoRegistro;
  fecha: Date;
  modalidad?: Modalidad;
}

export interface IUser {
  id: string;
  nombre: string;
  apellido: string;
  email: string;  
  password?: string;
}


export default class User implements IUser {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  password?: string;
  
  
  constructor(id: string, nombre: string, apellido: string, email: string, password?: string) {
    this.id = id;
    this.nombre = nombre;
    this.apellido = apellido;
    this.email = email;
    this.password = password;
  }
}
