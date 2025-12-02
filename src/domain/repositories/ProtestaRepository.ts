import DependenciasSync from "@domain/entities/DependenciasSync";
import MotivosProtesta from "@domain/entities/MotivosProtesta";
import ProtestaCiudadana from "@domain/entities/Protesta";
import TipoProstesta from "@domain/entities/TipoProtesta";
import TramiteSync from "@domain/entities/TramiteSync";

export interface ProtestaRepository {
    create(protesta: ProtestaCiudadana): Promise<string>
    listarTramites(idDep:number) :Promise<TramiteSync[]>
    listarDependencias():Promise<DependenciasSync[]>
    listarMotivos():Promise<MotivosProtesta[]>
    listarTipoProtesta():Promise<TipoProstesta[]>
}