import Users from "@domain/entities/users/Users";
import { UserRepository } from "@domain/repositories/users/usersRepository";

export class findAllUserCase {
  constructor(private userRepository: UserRepository) {}
  async execute(): Promise<Users[]> {
    return await this.userRepository.findAll();
  }
}
