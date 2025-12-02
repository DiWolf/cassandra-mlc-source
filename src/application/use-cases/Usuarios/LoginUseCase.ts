import bcrypt from "bcryptjs";
import { UsuariosRepository } from "@domain/repositories/UsuariosRepository";
import { JwtService } from "@infraestructure/security/JwtService";

export class LoginUseCase {
  constructor(
    private userRepo: UsuariosRepository,
    private jwtService: JwtService
  ) {}

  async execute(
    username: string,
    password: string
  ): Promise<{ token: string; user: any }> {
    // Get user information
    const usuario = await this.userRepo.execute(username);
    console.log(username);
    // check if user exists
    if (!usuario) {
      throw new Error("ERROR: User not found");
    }

    // Check if password is correct
    const isValidPassword = await bcrypt.compare(password, usuario.password);
    if (!isValidPassword) {
      throw new Error("ERROR: Invalid password");
    }

    const token = this.jwtService.generateToken({
      nombre_usuario: usuario.username,
      rol: usuario.role,
    });
    return { token, user: username };
  }
}
