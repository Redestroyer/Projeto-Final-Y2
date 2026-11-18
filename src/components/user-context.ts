import { createContext, useContext } from "react";

export type UserDTO = {
  name: string
};

// Em `/dashboard`, o único lugar onde este contexto será usado, o usuário sempre estará autenticado.
export const UserContext = createContext<UserDTO>(undefined!);
export default UserContext;
export const useUser = () => useContext(UserContext);
