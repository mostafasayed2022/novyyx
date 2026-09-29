import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/admin/login-form";
import { NovyxLogo } from "@/components/ui/novax-logo";
import { isAdminAuthenticated } from "@/lib/server/admin-auth";

export const metadata: Metadata = {
  title: "Admin Login | NOVYX",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  if (await isAdminAuthenticated()) redirect("/admin");

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-12 text-foreground">
      <div className="w-full max-w-md rounded-3xl border border-border bg-surface p-6 shadow-2xl shadow-black/5 sm:p-8">
        <div className="flex items-center justify-between gap-4">
          <NovyxLogo height={42} />
          <span className="rounded-full border border-border px-3 py-1 text-[9px] font-mono font-semibold uppercase tracking-[0.16em] text-muted-foreground">Admin</span>
        </div>
        <h1 className="mt-8 text-3xl font-semibold tracking-tight">Control Center</h1>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">Manage NOVYX products, media, inquiries, and AI-assisted content from the Next.js dashboard.</p>
        <LoginForm />
      </div>
    </main>
  );
}
