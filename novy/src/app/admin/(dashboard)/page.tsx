import Link from "next/link";
import { ArrowRight, Boxes, CircleCheckBig, Mail, Sparkles, TriangleAlert } from "lucide-react";
import { getContentStoreInfo, listAllProducts, listInquiries } from "@/lib/server/content-store";

export const dynamic = "force-dynamic";

export default async function AdminOverviewPage() {
  const [products, inquiries] = await Promise.all([listAllProducts(), listInquiries()]);
  const featured = products.filter((item) => item.featured).length;
  const inStock = products.filter((item) => item.inStock).length;
  const newInquiries = inquiries.filter((item) => item.status === "new").length;
  const storeInfo = getContentStoreInfo();

  const cards = [
    { label: "Products", value: products.length, icon: Boxes },
    { label: "Featured", value: featured, icon: Sparkles },
    { label: "In stock", value: inStock, icon: CircleCheckBig },
    { label: "New inquiries", value: newInquiries, icon: Mail },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[10px] font-mono font-semibold uppercase tracking-[0.18em] text-brand">NOVYX / Admin</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Dashboard overview</h1>
          <p className="mt-2 text-sm text-muted-foreground">Everything here is powered by the same Next.js application.</p>
        </div>
        <Link href="/admin/products/new" className="inline-flex h-10 items-center gap-2 self-start rounded-xl bg-brand px-4 text-xs font-semibold text-white">
          Add product <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {storeInfo.isEphemeral ? (
        <div className="flex gap-3 rounded-2xl border border-amber-500/25 bg-amber-500/10 p-4 text-sm text-amber-700 dark:text-amber-300">
          <TriangleAlert className="mt-0.5 h-5 w-5 shrink-0" />
          <p>This deployment is using Vercel temporary storage. Dashboard changes can reset after a cold start. For persistent production content on Vercel, configure <code className="font-mono">TURSO_DATABASE_URL</code> and <code className="font-mono">TURSO_AUTH_TOKEN</code>. On a VPS, you can instead set a persistent <code className="font-mono">NOVYX_DATA_DIR</code>.</p>
        </div>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map(({ label, value, icon: Icon }) => (
          <div key={label} className="rounded-2xl border border-border bg-surface p-5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-muted-foreground">{label}</p>
              <Icon className="h-4 w-4 text-brand" />
            </div>
            <p className="mt-5 text-3xl font-semibold tracking-tight">{value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-border bg-surface p-5 sm:p-6">
          <div className="flex items-center justify-between gap-4">
            <div><h2 className="font-semibold">Recent products</h2><p className="mt-1 text-xs text-muted-foreground">Latest catalog entries.</p></div>
            <Link href="/admin/products" className="text-xs font-semibold text-brand">Manage all</Link>
          </div>
          <div className="mt-5 divide-y divide-border/70">
            {products.slice(0, 5).map((product) => (
              <Link key={product.id} href={`/admin/products/${product.id}`} className="flex items-center justify-between gap-4 py-3 text-sm">
                <div><p className="font-medium">{product.name}</p><p className="mt-0.5 text-[11px] text-muted-foreground">{product.category} · {product.vialSizeMg} mg</p></div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </Link>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-surface p-5 sm:p-6">
          <div className="flex items-center justify-between gap-4">
            <div><h2 className="font-semibold">Recent inquiries</h2><p className="mt-1 text-xs text-muted-foreground">Messages submitted through the website.</p></div>
            <Link href="/admin/inquiries" className="text-xs font-semibold text-brand">View inbox</Link>
          </div>
          <div className="mt-5 divide-y divide-border/70">
            {inquiries.length ? inquiries.slice(0, 5).map((item) => (
              <div key={item.id} className="py-3">
                <div className="flex items-center justify-between gap-3"><p className="text-sm font-medium">{String(item.payload.firstName || item.payload.fullName || item.payload.email || item.id)}</p><span className="text-[10px] uppercase tracking-wider text-brand">{item.kind}</span></div>
                <p className="mt-1 truncate text-xs text-muted-foreground">{String(item.payload.message || item.payload.projectDescription || "Inquiry")}</p>
              </div>
            )) : <p className="py-8 text-sm text-muted-foreground">No inquiries yet.</p>}
          </div>
        </section>
      </div>
    </div>
  );
}
