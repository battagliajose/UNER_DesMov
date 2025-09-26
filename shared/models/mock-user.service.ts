import {IUser} from './user'
// Servicio simulado para obtener un usuario
export class MockUserService {
  public static obtenerUsuario(): IUser {
    return {
      id: 'user-1',
      nombre: 'Juan',
      apellido: 'Pérez',
      email: 'juan.perez@example.com',
    };
  }   
}