import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import { LoginForm } from "@/components/admin/LoginForm";

export const metadata: Metadata = {
  title: "Panel de administración",
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string }>;
}) {
  if (await isAdmin()) redirect("/admin");
  const sp = await searchParams;
  const from = typeof sp.from === "string" && sp.from.startsWith("/") ? sp.from : "/admin";
  return <LoginForm from={from} />;
}