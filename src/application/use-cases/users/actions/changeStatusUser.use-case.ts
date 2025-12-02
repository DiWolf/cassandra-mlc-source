import { UserRepository } from "@domain/repositories/users/usersRepository";
export class ChageStatusUserUseCase {
  constructor(private userRepository: UserRepository) {}
  async execute(uid: string, status: boolean): Promise<string> {
    return this.userRepository.changeStatus(uid, status);
  }
}
