import { DateField, EmailField, Label, PasswordField, Select, TelephoneField, TextField } from "components/formFields";
import { useRef, type MouseEventHandler } from "react";

const CPFPattern = /(\d{3})\.(\d{3})\.(\d{3})-(\d{2})/;

export default function SignupPage({}: PageProps<"/signup">) {
  const nomeField = useRef<HTMLInputElement>(undefined!);
  const cpfField = useRef<HTMLInputElement>(undefined!);
  const emailField = useRef<HTMLInputElement>(undefined!);
  const teleField = useRef<HTMLInputElement>(undefined!);
  const nascField = useRef<HTMLInputElement>(undefined!);
  const sexoField = useRef<HTMLSelectElement>(undefined!);
  const passwordField = useRef<HTMLInputElement>(undefined!);
  const repassField = useRef<HTMLInputElement>(undefined!);
  const cadastrar: MouseEventHandler<HTMLButtonElement> = e => {
    const nome = nomeField.current.value;
    const cpf = cpfField.current.value;
    const email = emailField.current.value;
    const tele = teleField.current.value;
    const nasc = nascField.current.valueAsDate!;
    const sexo = sexoField.current.value;
    const password = passwordField.current.value;
    const repass = repassField.current.value;
  };

  return (
    <div className="justify-content-center pt-32">
      <form className="grid grid-cols-3 gap-4">
        <Label htmlFor="nome" className="col-span-2">Nome: <TextField required ref={nomeField} /></Label>
        <Label htmlFor="cpf">CPF: <TextField required pattern={CPFPattern} ref={cpfField} /></Label>
        <Label htmlFor="email" className="col-span-2">E-mail: <EmailField required ref={emailField} /></Label>
        <Label htmlFor="tele">Telefone: <TelephoneField required ref={teleField} /></Label>
        <Label htmlFor="nasc" className="col-span-2">Data de Nascimento: <DateField required ref={nascField} /></Label>
        <Label htmlFor="sexo">Sexo: <Select name="sexo" id="sexo" defaultValue="n" required ref={sexoField}>
          <option value="n">Não Binário</option>
          <option value="f">Feminino</option>
          <option value="m">Masculino</option>
        </Select></Label>
        <Label htmlFor="password">Senha: <PasswordField required ref={passwordField} /></Label>
        <Label htmlFor="repass">Confirmar Senha: <PasswordField required ref={repassField} /></Label>
        <button type="button" onClick={cadastrar}>Cadastrar</button>
      </form>
    </div>
  )
}
/*
div.w-full.h-full.place-content-center.pt-32
  form.grid.grid-cols-3.gap-4(action="/signup", method="post")
    label.col-span-2(for="nome") Nome: #[input#nome(type="text", name="nome" required)]
    label(for="cpf") CPF: #[input#cpf(type="text", name="cpf" required)]
    label.col-span-2(for="email") E-mail: #[input#email(type="email", name="email" required)]
    label(for="tele") Telefone: #[input#tele(type="tel", name="tele" required)]
    label.col-span-2(for="nasc") Data de Nascimento: #[input#nasc(type="date", name="nasc" required)]
    label(for="sexo") Sexo:
      select#sexo(name="sexo" required)
        option(value="n") Não Binário
        option(value="m") Masculino
        option(value="f") Feminino
    label(for="password") Senha: #[input#password(type="password", name="password" required)]
    label(for="repassword") Confirmar Senha: #[input#password(type="password", name="repassword" required)]
    button(type="submit") Cadastrar
*/