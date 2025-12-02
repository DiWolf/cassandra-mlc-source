import DependenciaDTO from "@application/dtos/DependenciaDTO";
import DependenciasSync from "@domain/entities/DependenciasSync";
import DependenciaMapper from "@domain/mappers/DependenciaMapper";
import { ProtestaRepository } from "@domain/repositories/ProtestaRepository";

export class ListarDependencias {
  constructor(private dependenciasRepository: ProtestaRepository) {}

  async listarDependencias(): Promise<DependenciaDTO[]> {
    const dependencias: DependenciasSync[] =
      await this.dependenciasRepository.listarDependencias();
    return await DependenciaMapper.mapDependenciaSyncToDto(dependencias);
  }
}
