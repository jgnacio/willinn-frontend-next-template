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

  async getToken(credential: Credentials): Promise<TokenDTO> {
    if (!credential.email || !credential.password) {
      throw new Error("Invalid credentials");
    }

    if (
      WillinAPILoginTokenAdapter.TOKEN.token &&
      WillinAPILoginTokenAdapter.TOKEN.expiration > new Date()
    ) {
      return WillinAPILoginTokenAdapter.TOKEN;
    }

    const response = await axios
      .post(
        `${this.REST_API_URL}/users/login`,
        {
          email: credential.email,
          password: credential.password,
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
      .catch((error) => {
        console.error(error);
      });

    WillinAPILoginTokenAdapter.TOKEN = {
      token: response.token,
      expiration: new Date(response.expiration),
    };

    return WillinAPILoginTokenAdapter.TOKEN;
  }
}
