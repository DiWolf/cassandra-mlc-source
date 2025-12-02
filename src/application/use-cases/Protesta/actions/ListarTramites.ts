import TramiteDTO from "@application/dtos/TramiteDTO";
import TramiteSync from "@domain/entities/TramiteSync";
import TramitesMapper from "@domain/mappers/TramitesMapper";
import { ProtestaRepository } from "@domain/repositories/ProtestaRepository";

export class ListarTramitesPublic {
  constructor(private protestaRepository: ProtestaRepository) {}

  async listarTramites(idDep: number =0): Promise<TramiteDTO[]> {
    const tramites: TramiteSync[] = await this.protestaRepository.listarTramites(idDep);
    return await TramitesMapper.mapTramiteSyncToDTO(tramites);
  }
}
