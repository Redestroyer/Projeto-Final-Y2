import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest): Response {
  // Esta função roda antes de qualquer `layout`, `page` ou `route`.

  return NextResponse.next();
}