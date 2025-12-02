import Usuarios from "@domain/entities/Usuarios";
import { UsuariosRepository } from "@domain/repositories/UsuariosRepository";

export class CrearUsuario {
  constructor(private usuariosRepository: UsuariosRepository) {}

  async execute(entry: Usuarios): Promise<String> {
    return this.usuariosRepository.create(entry);
  }
}
