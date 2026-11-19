"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const enum UserRole {
  Student = "ALN",
  Professor = "PRF",
  Admin = "ADM"
}
export type UserDTO = {
  name: string;
  role: UserRole;
};

export async function getUser(): Promise<UserDTO | null> {
  const cs = await cookies();

  return {
    name: "(usuário)",
    role: UserRole.Admin
  };
}

function extractAuthenticationData(data: FormData): { cpf: string; password: string } | null {
  const cpf = data.get("cpf")?.toString()!;
  const password = data.get("password")?.toString()!;
  if ([cpf, password].includes(undefined!))
    return null;
  return { cpf, password };
}
type AuthenticateStatus = {
  status: "initial";
} | {
  status: "failure";
  error: string;
} | {
  status: "success";
  token: string;
};
export async function authenticate(status: AuthenticateStatus, data: FormData): Promise<AuthenticateStatus> {
  const extr = extractAuthenticationData(data);
  if (!extr)
    return { status: "failure", error: "INVALID DATA" };
  const { cpf, password } = extr;
  
  return { status: "success", token: "TODO" };
}
export async function unauthenticate(): Promise<never> {
  const cs = await cookies();

  redirect("/login")
}
