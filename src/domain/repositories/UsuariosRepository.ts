import Usuarios from "@domain/entities/Usuarios";

export interface UsuariosRepository {
  create(usuario: Usuarios): Promise<String>;
  execute(nombreUsuario: string): Promise<Usuarios | null>;
}
