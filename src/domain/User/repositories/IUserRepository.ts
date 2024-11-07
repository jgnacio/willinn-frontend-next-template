import { TokenDTO } from "@/domain/Auth/Token/entities/TokenEntity";
import { UserDTO } from "../entities/UserEntity";

export interface IUserRepository {
  findByEmail(email: string): Promise<UserDTO | null>;
  save(user: UserDTO): Promise<void>;
  update(user: UserDTO): Promise<void>;
  delete(id: string): Promise<void>;
  findAll(): Promise<UserDTO[]>;
  findById(id: string): Promise<UserDTO | null>;
  getCredentials(email: string, password: string): Promise<TokenDTO | null>;
}
