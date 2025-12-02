import Users from "@domain/entities/users/Users";

export interface UserRepository {
  created(entry: Users): Promise<string>;
  update(entry: Users): Promise<string>;
  changeStatus(uid: string, status: boolean): Promise<string>;
  getInfoUserToken(username: string): Promise<Users|null>;
  findAll(): Promise<Users[]>;
  findOne(uid: string): Promise<Users>;
}
