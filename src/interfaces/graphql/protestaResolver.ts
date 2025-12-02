import ProtestaMapper from "@domain/mappers/ProtestaMapper";
import { ProtestaRepositoryImpl } from "@infraestructure/repositories/protesta/ProtestaRepositoryImpl";
import { ProtestaRepositoryTotal } from "@infraestructure/repositories/others/ProtestaRepository";

// casos de uso
import { CrearProtesta } from "@application/use-cases/Protesta";
import { ListarTramitesPublic } from "@application/use-cases/Protesta/actions/ListarTramites";
import { ListarDependencias } from "@application/use-cases/Protesta/actions/ListarDependencias";
import { ListarMotivosPublic } from "@application/use-cases/Protesta/";
import { ListarTipoProtesta } from "@application/use-cases/Protesta/";

const protestaRepo = new ProtestaRepositoryImpl();

// Implementación de casos de uso
const createProtesta = new CrearProtesta(protestaRepo);
const listarTramites = new ListarTramitesPublic(protestaRepo);
const listarDependencias = new ListarDependencias(protestaRepo);
const listarMotivos = new ListarMotivosPublic(protestaRepo);
const listarTipoProtesta = new ListarTipoProtesta(protestaRepo);
export const protestaResolver = {
  crearProtestaCiudana: async (args: { input: any }) => {
    // Mapeamos antes de guardar en la base de datos
    const protesta = ProtestaMapper.mapDtoToProtesta(args.input);
    return await createProtesta.create(protesta);
  },
  obtenerTramitesQuery: async (args: { idDep: number }) => {
    return await listarTramites.listarTramites(args.idDep);
  },
  obtenerDependenciaQuery: async () => {
    return await listarDependencias.listarDependencias();
  },
  obtenerMotivosProtestaQuery: async () => {
    return await listarMotivos.listarMotivos();
  },
  obtenerTipoProtestaQuery: async () => {
    return await listarTipoProtesta.listarTipoProtesta();
  },
};
