import { useUser } from "components/user-context";
import { cls } from "lib/css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentPropsWithRef } from "react";
import type { JSX } from "react/jsx-runtime";

export default function NavBar(): JSX.Element {
  const links: { url: string, name: string }[] = [];

  return (
    <nav>
      <UserHeader />
      {links.map((link, i) => (<NavLink href={link.url} key={i}>{link.name}</NavLink>))}
    </nav>
  )
}

function UserHeader(): JSX.Element {
  const { name } = useUser();
  function logOut() {
    if (!confirm("Gostarias mesmo de desautenticar?")) return;
    console.log("Logging out...");
  }

  return (
    <div>
      <p>Bem-vindo sê, {name}</p>
      <button type="button" onClick={logOut}>Sair</button>
    </div>
  );
}


function NavLink({ className, ...props }: ComponentPropsWithRef<typeof Link>): JSX.Element {
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
