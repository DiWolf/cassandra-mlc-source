import LicitacionesDTO from "@application/dtos/LicitacioneDTO";
import Licitaciones from "@domain/entities/Licitaciones";
import LicitacionesMapper from "@domain/mappers/LicitacionesMapper";
import { LicitacionesRepository } from "@domain/repositories/LicitacionesRepository";
export class ListarLicitaciones {
  constructor(private LicitacionesRepository: LicitacionesRepository) {}

  async getAll(
    limite: number = 10,
    anio: number = 2024,
    pageState?: string
  ): Promise<{ data: LicitacionesDTO[]; nextPageState: string | null }> {
    // const licitaciones: Licitaciones[] =
    //   await this.LicitacionesRepository.getAll(pagina, limite, anio,pageState);
    const { data: licitaciones, nextPageState } =
      await this.LicitacionesRepository.getAll(limite, anio, pageState);

    // Mapea los datos a LicitacionesDTO[]
    const licitacionesDTO =
      LicitacionesMapper.mapLicitacionesArrayToDTO(licitaciones);

    // Retorna los datos mapeados y el estado de paginación
    return {
      data: licitacionesDTO,
      nextPageState,
    };

    // return LicitacionesMapper.mapLicitacionesArrayToDTO(licitaciones);
  }
}
