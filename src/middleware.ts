import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Verifica si el token de autenticación está presente en las cookies
  const token = request.cookies.get("token")?.value;

  // Si no hay token, redirige a la página de login
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Permite que la solicitud continúe si hay un token
  return NextResponse.next();
}

// Especifica las rutas donde el middleware debe aplicarse
export const config = {
  matcher: ["/"],
};
