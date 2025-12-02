import Usuarios from "@domain/entities/Usuarios";
import { UsuariosRepository } from "@domain/repositories/UsuariosRepository";

/// Acciones
//import { create } from "./actions/createUser";
//import { execute } from "./actions/loginUser";
import { create } from "./actions/createUserCassandra";
import { execute } from "./actions/loginUserCassandra";

export class UsuariosRepositoryImpl implements UsuariosRepository {
  async create(usuario: Usuarios): Promise<String> {
    return await create(usuario);
  }
  async execute(nombreUsuario: string): Promise<Usuarios | null> {
    return await execute(nombreUsuario);
  }
}
