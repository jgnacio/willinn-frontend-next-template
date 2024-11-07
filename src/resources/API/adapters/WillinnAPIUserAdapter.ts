import { User, UserDTO } from "@/domain/User/entities/UserEntity";
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

  async save(
    user: {
      name: string;
      lastName: string;
      email: string;
      password: string;
      active: boolean;
    },
    token: string
  ) {
    const formattedUser = {
      name: user.name,
      email: user.email,
      password: user.password,
    };

    const response = await axios
      .post(`${this.REST_API_URL}/users`, formattedUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw new Error(error);
      });
    return response;
  }

  async update(
    user: {
      id: string;
      name: string;
      email: string;
      password: string;
    },
    token: string
  ) {
    // Delete the user id from the user object
    const formattedUser = {
      name: user.name,
      email: user.email,
      password: user.password,
    };
    const response = await axios
      .put(`${this.REST_API_URL}/users/${user.id}`, formattedUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw new Error(error);
      });
    return response;
  }

  async delete(id: string, token: string) {
    const response = await axios
      .delete(`${this.REST_API_URL}/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw new Error(error);
      });
    return response;
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
    return new User(
      data.id,
      data.name,
      data.email,
      data.password,
      data.isActive
    );
  }

  async mapListToEntity(data: any): Promise<User[]> {
    return data.map((user: any) => {
      return new User(
        user.id,
        user.name,
        user.email,
        user.password,
        data.isActive
      );
    });
  }
}
