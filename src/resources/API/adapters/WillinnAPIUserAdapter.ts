import { User } from "@/domain/User/entities/UserEntity";
import { IUserRepository } from "@/domain/User/repositories/IUserRepository";
import axios from "axios";
import { WillinAPILoginTokenAdapter } from "./WillinnAPILoginTokenAdapter";
import { TokenDTO } from "@/domain/Auth/Token/entities/TokenEntity";

export class WillinAPIUserAdapter implements IUserRepository {
  private readonly REST_API_URL = process.env.WILLIN_REST_API_URL;

  async fetchUsers(token: string): Promise<User[]> {
    const users = await axios
      .get(`${this.REST_API_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        return response.data;
      });

    const usersMapped = this.mapListToEntity(users);

    return usersMapped;
  }
  async findByEmail(email: string) {
    return null;
  }

  async save(user: any) {
    return;
  }

  async update(user: any) {
    return;
  }

  async delete(id: string) {
    return;
  }

  async findAll() {
    return [];
  }

  async findById(id: string) {
    return null;
  }
  async getCredentials(email: string, password: string) {
    const willinApiLogin = new WillinAPILoginTokenAdapter();
    const token = await willinApiLogin.getToken();

    return token;
  }

  async mapToEntity(data: any): Promise<User> {
    return new User(data.id, data.name, data.email, data.password);
  }

  async mapListToEntity(data: any): Promise<User[]> {
    return data.map((user: any) => {
      return new User(user.id, user.name, user.email, user.password);
    });
  }
}
