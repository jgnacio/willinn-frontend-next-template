"use server";
import { WillinAPIUserAdapter } from "@/resources/API/adapters/WillinnAPIUserAdapter";

export const detete_user = async (id: string, token: string) => {
  const willinApiUser = new WillinAPIUserAdapter();
  const response = await willinApiUser.delete(id, token);
  return response;
};
