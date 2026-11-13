"use client";

import { useRef } from "react";

export default function LoginPage() {

  const cpfInput = useRef(undefined!);
  const passwordInput = useRef(undefined!);
  return (
    <form action="">
      <label htmlFor="cpf">CPF: <input type="text" name="cpf" id="cpf" /></label>
      <label htmlFor="password">Password: <input type="password" name="password" id="password" /></label>
      <button type="submit">Entrar</button>
    </form>
  )
}