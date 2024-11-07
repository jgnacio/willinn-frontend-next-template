"use server";
import { WillinAPILoginTokenAdapter } from "@/resources/API/adapters/WillinnAPILoginTokenAdapter";
import { cookies } from "next/headers";

export const getCredentials = async (email: string, password: string) => {
  const willinApiLogin = new WillinAPILoginTokenAdapter();
  try {
    const token = await willinApiLogin.setToken({ email, password });
    cookies().set("token", token.token, {
      path: "/",
      httpOnly: true,
      secure: true,
    });
    const response = {
      message: "Success",
      status: 200,
      data: token,
    };
    return response;
  } catch (error) {
    const response = {
      message: "Invalid credentials",
      status: 401,
      data: null,
    };
    return response;
  }
};
