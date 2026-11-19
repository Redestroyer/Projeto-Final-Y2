"use client";

import Form from "next/form";
import Link from "next/link";
import { authenticate } from "@/actions/auth";
import { Label, PasswordField, TextField } from "@/components/form-fields";
import { CPFPattern } from "..";
import { useActionState } from "react";

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(authenticate, { status: "initial" })

  return (
    <>
    <Form className="relative space-y-5 font-semibold" action={formAction}>
      <h1 className="font-bold text-3xl">Autenticação</h1>
      <div className="grid grid-cols-2">
        <Label htmlFor="cpf">CPF: <TextField pattern={CPFPattern} placeholder="123.456.789-10" required /></Label>
        <Label htmlFor="password">Senha: <PasswordField placeholder="Tua senha..." required /></Label>
      </div>
      <div className="flex flex-row-reverse w-full">
        <button className="static bottom-0 right-0 bg-green-400 text-white disabled:bg-slate-300 disabled:text-slate-700 border rounded-md p-1" type="submit" disabled={pending}>Entrar</button>
      </div>
    </Form>
    <div className="font-semibold place-content-center">
      <p className="my-0">Não estás cadastrado? <Link className="text-sky-400 font-bold" href="/signup">Cadastrasta-te!</Link></p>
      <p className="my-0">Esqueceste tua senha? <Link className="text-sky-400 font-bold" href="mailto:ddvm1@aluno.ifal.edu.br">Contata-nos!</Link></p>
    </div>
    </>
  )
}