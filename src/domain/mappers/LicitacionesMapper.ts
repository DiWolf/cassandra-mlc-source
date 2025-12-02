import Licitaciones from "@domain/entities/Licitaciones";
import LicitacionesDTO from "@application/dtos/LicitacioneDTO";

class LicitacionesMapper {
  /**
   * Mapea un objeto LicitacionesDTO a Licitaciones
   * @param dto El objeto LicitacionesDTO a transformar
   * @returns Un objeto Licitaciones transformado
   */
  public static mapDTOToLicitaciones(dto: LicitacionesDTO): Licitaciones {
    return {
      id: dto.id, // Mapea directamente el ID si está presente
      nombre: dto.nombre, // Mapea el nombre
      descripcion: dto.resumen, // Mapea el resumen
      vigencia: dto.vigencia, // Toma la fecha de inicio de vigencia
      junta_aclaraciones: dto.juntaAclaraciones, // Mapea junta de aclaraciones
      propuestas: dto.propuestas, // Mapea fecha de propuestas
      fallo_adjudicacion: dto.falloAdjudicacion, // Mapea fecha de fallo
      archivo: dto.archivo, // Renombra archivo a ruta_archivo
      publicada: dto.publicada, // Mapea directamente publicada
      created_at: new Date(), // Genera la fecha actual como created_at
      vigencia_anio: dto.anio, // Mapea directamente el año de vigencia
    };
  }

  public static mapLicitacionesArrayToDTO(
    licitaciones: Licitaciones[]
  ): LicitacionesDTO[] {
    return licitaciones.map((licitacion) => ({
      id: licitacion.id || "", // Mapea directamente el ID
      nombre: licitacion.nombre, // Mapea el nombre
      resumen: licitacion.descripcion, // Mapea el resumen
      vigencia: licitacion.vigencia, // Mapea directamente el objeto vigencia
      juntaAclaraciones: licitacion.junta_aclaraciones, // Mapea junta de aclaraciones
      propuestas: licitacion.propuestas, // Mapea fecha de propuestas
      falloAdjudicacion: licitacion.fallo_adjudicacion, // Mapea fecha de fallo
      archivo: licitacion.archivo, // Renombra ruta_archivo a archivo
      publicada: licitacion.publicada, // Mapea directamente publicada
      anio: licitacion.vigencia_anio, // Mapea directamente el año de vigencia
    }));
  }
}

export default LicitacionesMapper;
