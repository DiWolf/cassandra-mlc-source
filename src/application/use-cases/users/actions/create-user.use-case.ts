import Users from "@domain/entities/users/Users";
import { UserRepository } from "@domain/repositories/users/usersRepository";

export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}
  async execute(user: Users): Promise<string> {
    return this.userRepository.created(user);
  }
}
