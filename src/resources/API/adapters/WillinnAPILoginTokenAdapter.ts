import { Credentials } from "@/app/types/Credentials";
import { TokenDTO } from "@/domain/Auth/Token/entities/TokenEntity";
import { ITokenRepository } from "@/domain/Auth/Token/repositories/ITokenRepository";
import axios from "axios";

export class WillinAPILoginTokenAdapter implements ITokenRepository {
  private readonly REST_API_URL = process.env.WILLIN_REST_API_URL;
  private static TOKEN: TokenDTO = {
    token: "",
    expiration: new Date(),
  };

  constructor() {}

  async setToken(credentials: Credentials): Promise<TokenDTO> {
    if (!credentials.email || !credentials.password) {
      throw new Error("Invalid credentials");
    }

    const response = await axios
      .post(
        `${this.REST_API_URL}/users/login`,
        {
          email: credentials.email,
          password: credentials.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Invalid credentials");
        }
        return response.data;
      })
      .catch((error) => {});
    WillinAPILoginTokenAdapter.TOKEN = {
      token: response.token,
      expiration: new Date(response.expiration),
    };
    return WillinAPILoginTokenAdapter.TOKEN;
  }

  async getToken(): Promise<TokenDTO> {
    if (
      WillinAPILoginTokenAdapter.TOKEN.token &&
      WillinAPILoginTokenAdapter.TOKEN.expiration > new Date()
    ) {
      return WillinAPILoginTokenAdapter.TOKEN;
    }

    return WillinAPILoginTokenAdapter.TOKEN;
  }
}
