import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest): Promise<Response> {
  const authenticated = false;
  if (!authenticated)
    redirect("/login");
  
  redirect("/dashboard");
}