import {
  CreateLicitacionUseCase,
  ListAllLicitacionUseCase,
} from "@application/use-cases/licitaciones-use-cases";
import { LicitacionRepositoryImpl } from "@infraestructure/repositories/liciataciones/index";
const licitacionRepository = new LicitacionRepositoryImpl();
const createLicitacion = new CreateLicitacionUseCase(licitacionRepository);
const findAllLicitaciones = new ListAllLicitacionUseCase(licitacionRepository);
// Crear licitación (evento privado)
export const handleCrearLicitacion = async (data: any) => {
  try {
    if (!data || !data.numeroLicitacion) {
      throw new Error("Datos incompletos");
    }
    const nuevaLicitacion = await createLicitacion.execute(data);
    return nuevaLicitacion;
  } catch (error: any) {
    throw new Error("Error al crear la licitación: " + error.message);
  }
};

// Listar licitaciones (evento público)
export const handleListarLicitaciones = async () => {
  try {
    const licitaciones = await findAllLicitaciones.execute();
    return licitaciones;
  } catch (error: any) {
    throw new Error("Error al listar las licitaciones: " + error.message);
  }
};
