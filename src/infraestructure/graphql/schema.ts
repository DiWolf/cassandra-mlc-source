// src/graphql/schema.ts
// src/interfaces/graphql/resolvers/rootResolver.ts
import { buildSchema } from "graphql";

// Usuarios
import { usuarioMutation } from "./mutations/usuarios/usuarioMutation";
import { usuarioInput } from "./input/usuarioInput";
import { usuarioType } from "./types/usuarioType";
import { userLoginMutation } from "./mutations/usuarios/userLoginMutation";

import { queryholaMundo } from "./queries/queryTest";

// Licitations
import { crearLicitacionMutation } from "./mutations/licitaciones/crearLicitacionMutation";
import { LicitacionesInput } from "./input/licitacionesInput";
import { listarLicitacionesQuery } from "./queries/licitaciones/listarLicitacionesQuery";
import { licitacionType } from "./types/licitacionType";

//Protesta Ciudadana
import { obtenerTramitesQuery } from "./queries/tramites/obtenerTramitesQuery";
import { obtenerDependenciaQuery } from "./queries/tramites/obtenerDependenciaQuery";
import { obtenerMotivosProtestaQuery } from "./queries/tramites/obtenerMotivosProtesta";
import { crearProtestaCiudadana } from "./mutations/protestaCiudadana/crearProtestaCiudana";
import { ProtestaInpunt } from "./input/ProtestaInput";
import { tramiteType } from "./types/tramiteType";
import { dependenciaType } from "./types/dependenciaType";
import { MotivoProtestaType } from "./types/MotivoProtesta";
import { tipoProtestaType } from "./types/tipoProtestaType";
import { obtenerTipoProtestaQuery } from "./queries/tramites/obtenerTpoProtestaQuery";
import { LicitacionesResponseType } from "./types/LicitacionesResponse";

export const schema = buildSchema(`
 scalar Upload
 scalar DateTime 
  ${usuarioType}
  ${usuarioInput}
  ${LicitacionesInput}
  ${ProtestaInpunt}
  ${licitacionType}
  ${LicitacionesResponseType}
  ${tramiteType}
  ${dependenciaType}
  ${MotivoProtestaType}
  ${tipoProtestaType}
   type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }
  type Mutation {
  
    ${usuarioMutation}
    ${userLoginMutation}
    ${crearLicitacionMutation}
    ${crearProtestaCiudadana}
  }

  type Query {
  ${queryholaMundo}
  ${listarLicitacionesQuery}
  ${obtenerTramitesQuery}
  ${obtenerDependenciaQuery}
  ${obtenerMotivosProtestaQuery}
  ${obtenerTipoProtestaQuery}
}
 
`);
