"use client";

import { DateField, EmailField, Label, PasswordField, Select, SubmitButton, TelephoneField, TextField } from "@/components/form-fields";
import { useRef } from "react";
import Link from "next/link";
import Form from "next/form";

import { register } from "@/actions/auth";
import { CPFPattern } from "..";
import { useValidationReducer } from "./validation-reducer";


export default function SignupPage({}: PageProps<"/signup">) {
  const formRef = useRef<HTMLFormElement>(undefined!);
  const [validation, check] = useValidationReducer(formRef);

  async function formAction(data: FormData) {
    const result = await register(data);
    if (result.status == "failure") {
      alert(`Erro ao cadastrar: ${result.error}`);
      return;
    }
  }

  return (
    <div className="justify-content-center pt-32">
      <Form action={_=>{}} className="grid grid-cols-3 gap-4" ref={formRef}>
        <Label htmlFor="nome" className="col-span-2">Nome: <TextField required setValue={value => check({ field: "nome", value })} /></Label>
        <Label htmlFor="cpf">CPF: <TextField required pattern={CPFPattern} placeholder="123.456.789-10" setValue={value => check({ field: "cpf", value })} /></Label>
        <Label htmlFor="email" className="col-span-2">E-mail: <EmailField required setValue={value => check({ field: "email", value })} /></Label>
        <Label htmlFor="tele">Telefone: <TelephoneField required setValue={value => check({ field: "tele", value })} /></Label>
        <Label htmlFor="nasc" className="col-span-2">Data de Nascimento: <DateField required setValue={value => check({ field: "nasc", value })} /></Label>
        <Label htmlFor="sexo">Sexo: <Select name="sexo" id="sexo" defaultValue="n" required setValue={value => check({ field: "sexo", value })}>
          <option value="n">Não Binário</option>
          <option value="f">Feminino</option>
          <option value="m">Masculino</option>
        </Select></Label>
        <Label htmlFor="senha">Senha: <PasswordField required setValue={value => check({ field: "senha" , value })} /></Label>
        <Label htmlFor="repass">Confirmar Senha: <PasswordField required setValue={value => check({ field: "repass" , value })} /></Label>
        <SubmitButton disabled={!validation.valid}>Cadastrar</SubmitButton>
      </Form>
      <p>Já cadastrado? <Link href="/login">Autentica-te!</Link></p>
    </div>
  )
}
