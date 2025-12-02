import TramiteDTO from "@application/dtos/TramiteDTO";
import TramiteSync from "@domain/entities/TramiteSync";

class TramitesMapper {
  /**
   * Mapea un objeto TramiteSync a TramiteDto
   * @param tramite El objeto TramiteSync a Transformar
   * @returns Un objecto TramiteDto transformado
   */

  public static mapTramiteSyncToDTO(tramite: TramiteSync[]): TramiteDTO[] {
  
    return tramite.map((tra) => ({
      idDep: tra.id_dep,
      idTramite: tra.id_tramite,
      nombre: tra.nombre,
    }));
  }
}

export default TramitesMapper;