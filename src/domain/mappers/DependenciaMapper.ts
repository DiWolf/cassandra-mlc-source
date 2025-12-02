import DependenciaDTO from "@application/dtos/DependenciaDTO";
import DependenciasSync from "@domain/entities/DependenciasSync";

class DependenciaMapper {
    /**
     * Mapea un objecto DependenciaSync a DependenciaDto
     * @param dependencia El objeto DependenciaSync a transformar
     * @returns un objecto DependenciaDto transformado
     */
  public static mapDependenciaSyncToDto(
    dependencia: DependenciasSync[]
  ): DependenciaDTO[] {
    return dependencia.map((dep) => ({
      idDep: dep.id_dep,
      nombre: dep.nombre,
    }));
  }
}
export default DependenciaMapper;