import { IRegistro, TipoRegistro, Modalidad } from './user';

// Función para generar fechas aleatorias en el último mes
const fechasAlAzar = (): Date => {
  const hoy = new Date();
  const mesPasado = new Date().setMonth(hoy.getMonth() - 1);
  const fechaAleatoria = new Date(
    mesPasado + Math.random() * (hoy.getTime() - mesPasado),
  );
  return fechaAleatoria;
};

// El servicio para generar los datos
export class MockDataService {
    // Método estático para crear registros aleatorios. Retorno array de tipo IRegistro
  public static crearRegistro(): IRegistro[] {
    
    //Declaro array de registros vacio
    const registros: IRegistro[] = [];

    // Creamos entre 10 y 20 registros aleatorios
    const cantidadRegistros = Math.floor(Math.random() * 11) + 10;

    for (let i = 0; i < cantidadRegistros; i++) {
      //Defino un valor aleatorio entre 'ingreso' y 'egreso' + ,modalidad
      const tipo: TipoRegistro = Math.random() > 0.5 ? 'ingreso' : 'egreso';
      const modalidad: Modalidad = Math.random() > 0.5 ? 'presencial' : 'remoto';
      //Cargi el array de registros de ambos tipos.
      registros.push({
        id: `reg-${i}`,
        tipo: tipo,
        modalidad: modalidad,
        fecha: fechasAlAzar(),
      });
    }

    // Ordenamos los registros por fecha, del más reciente al más antiguo
    registros.sort((a, b) => b.fecha.getTime() - a.fecha.getTime());    
    
    return registros
  }
}
