"use client";

import type { UserDTO } from "@/actions/auth";
import { createContext, useContext, type ComponentPropsWithRef, type JSX } from "react";

// Em `/dashboard`, o único lugar onde este contexto será usado, o usuário sempre estará autenticado.
export const UserContext = createContext<UserDTO>(undefined!);
export const useUser = () => useContext(UserContext);
export type DashboardWrapperProps = ComponentPropsWithRef<"div"> & {
  user: UserDTO
}
export default function DashboardWrapper({ user, ...props }: DashboardWrapperProps): JSX.Element {
  return (
    <UserContext value={user}>
      <div {...props} />
    </UserContext>
  )
}
