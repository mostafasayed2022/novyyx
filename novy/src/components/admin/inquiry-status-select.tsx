"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { InquiryStatus } from "@/lib/api/types";

export function InquiryStatusSelect({ id, value }: { id: string; value: InquiryStatus }) {
  const router = useRouter();
  const [status, setStatus] = useState(value);
  const [saving, setSaving] = useState(false);

  async function changeStatus(nextStatus: InquiryStatus) {
    setStatus(nextStatus);
    setSaving(true);
    const response = await fetch(`/api/admin/inquiries/${encodeURIComponent(id)}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: nextStatus }),
    }).catch(() => null);
    if (!response?.ok) setStatus(value);
    setSaving(false);
    router.refresh();
  }

  return (
    <select
      value={status}
      disabled={saving}
      onChange={(event) => void changeStatus(event.target.value as InquiryStatus)}
      aria-label="Inquiry status"
      className="h-9 rounded-lg border border-border bg-background px-2.5 text-[11px] font-semibold outline-none disabled:opacity-60"
    >
      <option value="new">New</option>
      <option value="in-progress">In progress</option>
      <option value="resolved">Resolved</option>
    </select>
  );
}
