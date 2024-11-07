"use server";
import { UserDTO } from "@/domain/User/entities/UserEntity";
import ClassToObject from "@/lib/functions/classToObj";
import { WillinAPIUserAdapter } from "@/resources/API/adapters/WillinnAPIUserAdapter";

export const getUsers = async (token: string): Promise<UserDTO[]> => {
  const willinAPIUserAdapter = new WillinAPIUserAdapter();
  const users = await willinAPIUserAdapter.fetchUsers(token);
  if (!users) {
    return [];
  }

  const usersDTO = users.map((user) => ClassToObject(user));
  return usersDTO;
};
