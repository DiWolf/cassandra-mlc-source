import { UsuariosRepositoryImpl } from "@infraestructure/repositories/users/UsuarioRepositoryImpl";
import {
  CrearUsuario,
  LoginUseCase,
} from "../../application/use-cases/Usuarios/";
import Usuarios from "../../domain/entities/Usuarios";
import { JwtService } from "@infraestructure/security/JwtService";

const usuariosRepo = new UsuariosRepositoryImpl();
const jwtatuh = new JwtService(
  process.env.JWT_SECRET || "abcdef",
  process.env.JWT_EXPIRES_IN || "1h"
);
const crearUsuariosRepo = new CrearUsuario(usuariosRepo);
const iniciaSesionRepo = new LoginUseCase(usuariosRepo, jwtatuh);
export const usuariosResolver = {
  crearUsuario: async ({ usuario }: { usuario: Usuarios }) => {
    return await crearUsuariosRepo.execute(usuario);
  },
  login: async (args: { username: any; password: any }) => {
    return await iniciaSesionRepo.execute(args.username, args.password);
  },
};
