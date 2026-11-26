"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { AutenticacaoService } from "@/lib/services";

export const enum UserRole {
  Student = "ALN",
  Professor = "PRF",
  Admin = "ADM"
}
export type UserDTO = {
  nome: string;
  role: UserRole;
};

export async function getUser(): Promise<UserDTO | null> {
  const cs = await cookies();

  return {
    nome: "(usuário)",
    role: UserRole.Admin
  };
}

async function createSession(cpf: string, password: string, cs?: Awaited<ReturnType<typeof cookies>>): Promise<string | null> {
  const token = await AutenticacaoService.autenticar(cpf, password);
  if (!token) {
    return null;
  }

  cs ??= await cookies();
  cs.set("Authorization", `Bearer ${token}`, {
    httpOnly: true,
    secure: true,
    expires: new Date(Date.now() + 1000 * 60 * 30), // 30min
    sameSite: "lax",
    path: "/"
  });

  return token;
}

function extractAuthenticationData(data: FormData): { cpf: string; password: string } | null {
  const cpf = data.get("cpf")?.toString()!;
  const password = data.get("password")?.toString()!;
  if ([cpf, password].includes(undefined!))
    return null;
  return { cpf, password };
}
export type AuthenticateResult = {
  status: "failure";
  error: string;
} | {
  status: "success";
  token: string;
};
export async function authenticate(data: FormData): Promise<AuthenticateResult> {
  const extr = extractAuthenticationData(data);
  if (!extr)
    return { status: "failure", error: "INVALID DATA" };
  const { cpf, password } = extr;
  
  const token = await createSession(cpf, password);
  if (!token)
    return { status: "failure", error: "Credenciais incorretas!" };
  return { status: "success", token };
}
export async function unauthenticate(): Promise<never> {
  const cs = await cookies();
  cs.delete("Authorization");
  redirect("/login");
}

function extractRegistrationData(data: FormData): { cpf: string; nome: string; email: string; tele: string; nasc: Date; sexo: "n" | "f" | "m"; senha: string } | null {
  const cpf = data.get("cpf")?.toString()!;
  const nome = data.get("nome")?.toString()!;
  const email = data.get("email")?.toString()!;
  const tele = data.get("tele")?.toString()!;
  const nasc = data.get("nasc")?.toString()!;
  const sexo = data.get("sexo")?.toString()!;
  const senha = data.get("senha")?.toString()!;

  if ([cpf, nome, email, tele, nasc, sexo, senha].includes(undefined!))
    return null;
  if (!["n", "f", "m"].includes(sexo))
    return null;

  return { cpf, nome, email, tele, nasc: new Date(nasc), sexo: sexo as any, senha };
}
export type RegisterResult = {
  status: "failure";
  error: string;
} | {
  status: "success";
  userId: number;
  token: string;
};
export async function register(data: FormData): Promise<RegisterResult> {
  const extr = extractRegistrationData(data);
  if (!extr)
    return { status: "failure", error: "INVALID DATA" };
  const { cpf, nome, email, tele, nasc, sexo, senha } = extr;

  throw new Error("TODO: Registering.");
}
