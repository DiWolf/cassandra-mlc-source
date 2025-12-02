import Users from "@domain/entities/users/Users";
import { UserRepository } from "@domain/repositories/users/usersRepository";

export class findOneUseCase {
  constructor(private userRepository: UserRepository) {}
  async execute(uid: string): Promise<Users> {
    return await this.userRepository.findOne(uid);
  }
}
