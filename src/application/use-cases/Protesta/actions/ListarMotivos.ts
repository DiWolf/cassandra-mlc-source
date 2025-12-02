import MotivoProtestaDTO from "@application/dtos/MotivoProtestaDTO";
import MotivosProtesta from "@domain/entities/MotivosProtesta";
import MotivoProtestaMapper from "@domain/mappers/MotivosProtestaMapper";
import { ProtestaRepository } from "@domain/repositories/ProtestaRepository";

export class ListarMotivosPublic {
  constructor(private protestaRepository: ProtestaRepository) {}

  async listarMotivos(): Promise<MotivoProtestaDTO[]> {
    const motivos: MotivosProtesta[] = await this.protestaRepository.listarMotivos();
    return await MotivoProtestaMapper.mapMotivoProtestaSyncToDTO(motivos);
  }
}