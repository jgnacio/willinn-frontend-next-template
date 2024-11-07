"use server";
import { WillinAPIUserAdapter } from "@/resources/API/adapters/WillinnAPIUserAdapter";

export const saveUser = async (
  user: {
    name: string;
    lastName: string;
    email: string;
    password: string;
    active: boolean;
  },
  token: string
) => {
  const willinAPIUserAdapter = new WillinAPIUserAdapter();
  return willinAPIUserAdapter.save(user, token);
};
