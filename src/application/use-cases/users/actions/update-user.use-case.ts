import Users from "@domain/entities/users/Users";
import { UserRepository } from "@domain/repositories/users/usersRepository";
export class UpdateUserUseCase {
  constructor(private userRepository: UserRepository) {}
  async execute(user: Users): Promise<string> {
    return this.userRepository.update(user);
  }
}
