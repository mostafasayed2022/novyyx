"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function DeleteProductButton({ id, name }: { id: string; name: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  return (
    <button
      type="button"
      disabled={loading}
      onClick={async () => {
        if (!window.confirm(`Delete ${name}? This cannot be undone.`)) return;
        setLoading(true);
        const response = await fetch(`/api/admin/products/${encodeURIComponent(id)}`, { method: "DELETE" });
        if (!response.ok) {
          const data = (await response.json().catch(() => null)) as { detail?: string } | null;
          window.alert(data?.detail || "Unable to delete product.");
          setLoading(false);
          return;
        }
        router.refresh();
      }}
      className="inline-flex items-center gap-1.5 rounded-lg border border-rose-500/20 px-2.5 py-2 text-[11px] font-medium text-rose-500 transition hover:bg-rose-500/10 disabled:opacity-50"
    >
      <Trash2 className="h-3.5 w-3.5" />
      Delete
    </button>
  );
}
