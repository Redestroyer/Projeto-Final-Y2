"use client";

import Form from "next/form";
import Link from "next/link";
import { authenticate } from "@/actions/auth";
import { InvalidationWrapper, InvalidNotice, Label, PasswordField, SubmitButton, TextField } from "@/components/form-fields";
import { CPFPattern } from "..";

export default function LoginPage() {
  async function formAction(data: FormData) {
    const result = await authenticate(data);
    if (result.status == "failure") {
      alert(`Erro ao autenticar: ${result.error}`);
      return;
    } else {
      const { token } = result;
      alert(`Token "${token}" acquired!`);
    }
  }

  return (
    <>
    <Form className="relative space-y-5 font-semibold" action={formAction}>
      <h1 className="font-bold text-3xl">Autenticação</h1>
      <div className="grid grid-cols-2">
        <Label htmlFor="cpf">CPF: <InvalidationWrapper>
          <TextField pattern={CPFPattern} placeholder="123.456.789-10" required />
          <InvalidNotice className="border rounded-sm border-red-500 bg-red-400 text-red-600">CPF deve seguir o padrão XXX.XXX.XXX-XX</InvalidNotice>
        </InvalidationWrapper></Label>
        <Label htmlFor="password">Senha: <PasswordField placeholder="Tua senha..." required /></Label>
      </div>
      <div className="flex flex-row-reverse w-full">
        <SubmitButton className="static bottom-0 right-0">Entrar</SubmitButton>
      </div>
    </Form>
    <div className="font-semibold place-content-center">
      <p className="my-0">Não estás cadastrado? <Link className="text-sky-400 font-bold" href="/signup">Cadastrasta-te!</Link></p>
      <p className="my-0">Esqueceste tua senha? <Link className="text-sky-400 font-bold" href="mailto:ddvm1@aluno.ifal.edu.br">Contata-nos!</Link></p>
    </div>
    </>
  )
}