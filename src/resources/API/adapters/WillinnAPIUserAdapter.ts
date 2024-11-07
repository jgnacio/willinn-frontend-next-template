"use server";
import { User } from "@/domain/User/entities/UserEntity";
import { IUserRepository } from "@/domain/User/repositories/IUserRepository";
import axios from "axios";
import { WillinAPILoginTokenAdapter } from "./WillinnAPILoginTokenAdapter";

export class WillinAPIUserAdapter implements IUserRepository {
  private readonly REST_API_URL = process.env.WILLIN_REST_API_URL;

  async fetchUser(): Promise<User> {
    throw new Error("Method not implemented.");
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
    const token = await willinApiLogin.getToken({ email, password });

    return token;
  }
}
