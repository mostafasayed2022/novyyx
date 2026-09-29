"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { useState } from "react";

export function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  return (
    <button
      type="button"
      disabled={loading}
      onClick={async () => {
        setLoading(true);
        await fetch("/api/admin/session", { method: "DELETE" }).catch(() => null);
        router.replace("/admin/login");
        router.refresh();
      }}
      className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-xs font-medium text-muted-foreground transition hover:text-foreground disabled:opacity-50"
    >
      <LogOut className="h-3.5 w-3.5" />
      Logout
    </button>
  );
}
