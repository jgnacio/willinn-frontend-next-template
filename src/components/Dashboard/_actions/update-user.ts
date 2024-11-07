"use server";
import { UserDTO } from "@/domain/User/entities/UserEntity";
import { WillinAPIUserAdapter } from "@/resources/API/adapters/WillinnAPIUserAdapter";

export const update_user = async (
  user: {
    id: string;
    name: string;
    email: string;
    password: string;
  },
  token: string
) => {
  const willinApiUser = new WillinAPIUserAdapter();
  const response = await willinApiUser.update(user, token);
  return response;
};
