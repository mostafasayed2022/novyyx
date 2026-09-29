import { InquiryStatusSelect } from "@/components/admin/inquiry-status-select";
import { listInquiries } from "@/lib/server/content-store";

export const dynamic = "force-dynamic";

export default async function AdminInquiriesPage() {
  const inquiries = await listInquiries();
  return (
    <div className="space-y-6">
      <div><p className="text-[10px] font-mono font-semibold uppercase tracking-[0.18em] text-brand">CRM / Inbox</p><h1 className="mt-2 text-3xl font-semibold tracking-tight">Inquiries</h1><p className="mt-2 text-sm text-muted-foreground">Contact and partnership submissions collected by the Next.js API.</p></div>
      <div className="space-y-3">
        {inquiries.length ? inquiries.map((item) => (
          <article key={item.id} className="rounded-2xl border border-border bg-surface p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div><div className="flex flex-wrap items-center gap-2"><h2 className="font-semibold">{String(item.payload.firstName || item.payload.fullName || "Inquiry")} {String(item.payload.lastName || "")}</h2><span className="rounded-full bg-brand/10 px-2 py-1 text-[9px] font-semibold uppercase tracking-wider text-brand">{item.kind}</span></div><p className="mt-1 text-xs text-muted-foreground">{String(item.payload.email || "")} · {String(item.payload.company || item.payload.institution || "")}</p></div>
              <div className="flex items-end gap-3 sm:flex-col"><InquiryStatusSelect id={item.id} value={item.status} /><div className="text-right"><p className="text-[10px] font-mono text-muted-foreground">{item.id}</p><p className="mt-1 text-[10px] text-muted-foreground">{new Date(item.createdAt).toLocaleString("en-GB")}</p></div></div>
            </div>
            <p className="mt-4 whitespace-pre-wrap rounded-xl bg-background p-4 text-sm leading-6 text-foreground/80">{String(item.payload.message || item.payload.projectDescription || "No message supplied.")}</p>
            <div className="mt-4 grid gap-2 text-xs text-muted-foreground sm:grid-cols-2 lg:grid-cols-4">
              {Object.entries(item.payload).filter(([key]) => !["message", "projectDescription", "firstName", "lastName", "fullName", "email"].includes(key)).map(([key, value]) => <p key={key}><span className="font-medium text-foreground">{key}:</span> {String(value ?? "")}</p>)}
            </div>
          </article>
        )) : <div className="rounded-2xl border border-dashed border-border p-12 text-center text-sm text-muted-foreground">No inquiries yet.</div>}
      </div>
    </div>
  );
}
