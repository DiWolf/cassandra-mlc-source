import MotivoProtestaDTO from "@application/dtos/MotivoProtestaDTO";
import MotivosProtesta from "@domain/entities/MotivosProtesta";

class MotivoProtestaMapper {
  public static mapMotivoProtestaSyncToDTO(
    motivo: MotivosProtesta[]
  ): MotivoProtestaDTO[] {
    return motivo.map((mot) => ({
      idMotivo: mot.id,
      motivo: mot.nombre,
    }));
  }
}

export default MotivoProtestaMapper;
