import type { JSX } from "react/jsx-runtime";
import { redirect } from "next/navigation";
import DashboardWrapper from "@/app/dashboard/dashboard-wrapper";
import { getUser } from "@/actions/auth";
import NavBar from "./nav-bar";

export default async function DashboardLayout({ children }: LayoutProps<"/dashboard">): Promise<JSX.Element> {
  const user = await getUser();
  if (!user)
    redirect("/login")

  return (
    <DashboardWrapper user={user}>
      <NavBar />
      <main>
        {children}
      </main>
    </DashboardWrapper>
  )
}


