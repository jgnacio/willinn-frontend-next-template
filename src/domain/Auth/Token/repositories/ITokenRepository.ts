import { Credentials } from "@/app/types/Credentials";
import { TokenDTO } from "../entities/TokenEntity";

export interface ITokenRepository {
  getToken(credential: Credentials): Promise<TokenDTO>;
}
