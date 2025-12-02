import bcrypt from "bcryptjs";
import { generateToken } from "@shared/utils/token.util";
import { UserRepository } from "@domain/repositories/users/usersRepository";
export class getInfoUserTokenUseCase {
  constructor(private userRepository: UserRepository) {}
  async execute(username: string, password: string): Promise<string> {
    const user = await this.userRepository.getInfoUserToken(username);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error("Credenciales inválidas");
    }
    return generateToken({ uid: user.uid, role: user.role });
  }
}
