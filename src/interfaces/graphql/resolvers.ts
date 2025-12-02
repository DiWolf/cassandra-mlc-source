

import { licitacionesResolver } from "./licitacionesResolver";
import { protestaResolver } from "./protestaResolver";
import { usuariosResolver } from "./usuariosResolver";

export const rootResolver = {
  ...usuariosResolver,
  ...licitacionesResolver,
  ...protestaResolver
  // getEmployees: async () => {
  //   return "hola mundo";
  // }
};
