import { cookies } from "next/headers";
import { adminSessionCookieName, verifySessionToken } from "@/lib/auth-core";

export async function isAdmin(): Promise<boolean> {
  const store = await cookies();
  const token = store.get(adminSessionCookieName())?.value;
  return verifySessionToken(token);
}

export async function requireAdmin(): Promise<void> {
  if (!(await isAdmin())) {
    throw new Error("No autorizado: sesión de administrador inválida");
  }
}