import ProtestaDto from "@application/dtos/ProtestaDTO";
import ProtestaCiudadana from "@domain/entities/Protesta";

class ProtestaMapper {
    /**
     * Mapea un objecto ProtestaDto a ProtestaCiudadana 
     */

    public static mapDtoToProtesta(dto: ProtestaDto): ProtestaCiudadana {
        return {
            id: dto.id ,
            nombre: dto.nombre,
            primer_apellido: dto.primerApellido,
            segundo_apellido: dto.segundoApellido,
            correo_electronico: dto.correo,
            tramite_id: dto.tramite,
            dependencia_id: dto.dependencia,
            folio_tramite: dto.folio,
            nombre_servidor_publico: dto.servidorPublico,
            liga_tramite: dto.ligaTramite || "",
            tipo_protesta_id: dto.tipoProtesta,
            descripcion_hecho: dto.descripcionHechos,
            fecha_de_hechos: dto.fechaHechos,
            lugar_hechos: dto.lugarHechos,
            motivo: dto.motivo || "",
        }
    }


}

export default ProtestaMapper;