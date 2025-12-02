import Users from "@domain/entities/users/Users";
import { UserRepository } from "@domain/repositories/users/usersRepository";

import { create } from "./actions/createUser";
import {getInfoUserToken} from './actions/getInfoUserToken'
export class UserRepositoryImpl implements UserRepository {
  async created(entry: Users): Promise<string> {
    return await create(entry);
  }
  update(entry: Users): Promise<string> {
    throw new Error("Method not implemented."+entry);
  }
  changeStatus(uid: string, status: boolean): Promise<string> {
    throw new Error("Method not implemented."+uid+status);
  }
  async getInfoUserToken(username: string): Promise<Users|null> {
    return await getInfoUserToken(username);
  }
  findAll(): Promise<Users[]> {
    throw new Error("Method not implemented.");
  }
  findOne(uid: string): Promise<Users> {
    throw new Error("Method not implemented."+uid);
  }
}
