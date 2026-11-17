"use client";

import Link from "next/link";
import { Label, PasswordField, TextField } from "components/form-fields";
import { CPFPattern } from "..";

export default function LoginPage() {
  return (
    <>
    <form >
      <Label htmlFor="cpf">CPF: <TextField pattern={CPFPattern} required /></Label>
      <Label htmlFor="password">Password: <PasswordField required /></Label>
      <button type="submit">Entrar</button>
    </form>
    <p>Não estás cadastrado? <Link href="/signup">Cadastrasta-te!</Link></p>
    </>
  )
}