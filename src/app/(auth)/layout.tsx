import Image from "next/image";
import { redirect } from "next/navigation";
import type { JSX } from "react/jsx-runtime";

export default async function AuthLayout({ children }: LayoutProps<"/">): Promise<JSX.Element> {
  const authenticated = false;
  if (authenticated)
    redirect("/dashboard");
  
  return (
    <div className="min-h-screen bg-gray-800 text-gray-100 px-8 py-10 md:p-24 flex flex-col justify-center place-items-center">
      <div className="w-20 h-20 rounded-2xl mb-6 grid place-items-center shrink-0">
        <Image width="12" height="12" src="/icon.svg" alt="Ícone" unoptimized />
      </div>
      <div className="font-bold text-5xl mb-5">Fit Control</div>
      <p className="text-gray-300 text-xl max-w-lg">Gestão de academia</p>
      <div className="grid place-items-center min-w-lg p-6 md:p-12 mx-4 mb-4">
        <div className="w-full max-w-lg bg-slate-50 text-slate-700 border rounded-2xl p-8 md:p-10">
          {children}
        </div>
      </div>
    </div>
  );
}