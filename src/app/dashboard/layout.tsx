import type { JSX } from "react/jsx-runtime";
import NavBar from "./nav-bar";
import UserContext from "components/user-context";

export default function DashboardLayout({ children }: LayoutProps<"/dashboard">): JSX.Element {
  return (
    <UserContext value={{ name: "(usuário)" }}>
      <NavBar />
      <main>
        {children}
      </main>
    </UserContext>
  )
}


