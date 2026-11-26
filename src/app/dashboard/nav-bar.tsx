"use client";

import type { ComponentPropsWithoutRef } from "react";
import type { JSX } from "react/jsx-runtime";
import type { Route } from "next";
import Link, { type LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { unauthenticate, type UserRole } from "@/actions/auth";
import { useUser } from "@/app/dashboard/dashboard-wrapper";
import { cls } from "@/lib/css";

type NavLinkData = { name: string; url: string; };
const sharedLinks: NavLinkData[] = [
  { name: "Início", url: "" }
];
const linksByRole: {
  [Role in UserRole]: NavLinkData[];
} = {
  ALN: [],
  PRF: [],
  ADM: [
    { name: "Professores", url: "professors" },
    { name: "Alunos", url: "students" },
    { name: "Planos", url: "plans" },
    { name: "Mensalidades", url: "payments" },
    { name: "Relatórios", url: "reports" }
  ]
};

export default function NavBar(): JSX.Element {
  const { role } = useUser();
  const links = [...sharedLinks, ...linksByRole[role]];

  return (
    <nav>
      <UserHeader />
      {links.map((link, i) => (<NavLink href={`/dashboard/${link.url}` as Route} key={link.name}>{link.name}</NavLink>))}
    </nav>
  )
}

function UserHeader(): JSX.Element {
  const { nome: name } = useUser();
  async function logOut() {
    if (!confirm("Gostarias mesmo de desautenticar?")) return;
    await unauthenticate();
  }

  return (
    <div>
      <p>Bem-vindo sê, {name}</p>
      <button type="button" onClick={logOut}>Sair</button>
    </div>
  );
}

function NavLink<RouteType>({ className, ...props }: LinkProps<RouteType>): JSX.Element {
  const currentUrl = usePathname();
  if (currentUrl == props.href)
    return (
      <span className={cls`${className} font-bold`} {...props} />
    )
  else
    return (
      <Link className={cls`${className} text-sky-400`} {...props} />
    )
}
