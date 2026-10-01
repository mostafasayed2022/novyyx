import Image from "next/image";
import Link from "next/link";
import { Edit3, Plus } from "lucide-react";
import type { Product } from "@/lib/api/types";
import { DeleteProductButton } from "@/components/admin/delete-product-button";

export function AdminProductList({
  products,
  title,
  subtitle,
}: {
  products: Product[];
  title: string;
  subtitle: string;
}) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[10px] font-mono font-semibold uppercase tracking-[0.18em] text-brand">Catalog</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">{title}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
        </div>
        <Link href="/admin/products/new" className="inline-flex h-10 items-center gap-2 self-start rounded-xl bg-brand px-4 text-xs font-semibold text-white">
          <Plus className="h-4 w-4" /> Add product
        </Link>
      </div>

      <div className="flex flex-wrap gap-2">
        <Link href="/admin/products" className="rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground">All</Link>
        <Link href="/admin/products/peptides" className="rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground">Peptides</Link>
        <Link href="/admin/products/skin-boosters" className="rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground">Skin Boosters</Link>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-surface">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] text-left text-sm">
            <thead className="border-b border-border bg-background/50 text-[10px] uppercase tracking-[0.13em] text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">Group</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Purity</th>
                <th className="px-4 py-3">Stock</th>
                <th className="px-4 py-3">Featured</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/70">
              {products.map((product) => (
                <tr key={product.id} className="transition hover:bg-background/50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-12 overflow-hidden rounded-lg border border-border bg-background">
                        {product.imageUrl ? (
                          <Image src={product.imageUrl} alt="" fill sizes="48px" className="object-contain p-1.5" />
                        ) : (
                          <div className="flex h-full items-center justify-center text-center text-[8px] font-semibold uppercase tracking-wide text-muted-foreground">No image</div>
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="mt-0.5 text-[11px] text-muted-foreground">/{product.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{product.productType === "skin-booster" ? "Skin Booster" : "Peptide"}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{product.category}</td>
                  <td className="px-4 py-3 text-xs">{product.purity}%</td>
                  <td className="px-4 py-3"><span className={`rounded-full px-2 py-1 text-[10px] font-semibold ${product.inStock ? "bg-emerald-500/10 text-emerald-600" : "bg-rose-500/10 text-rose-500"}`}>{product.inStock ? "In stock" : "Out"}</span></td>
                  <td className="px-4 py-3 text-xs">{product.featured ? "Yes" : "No"}</td>
                  <td className="px-4 py-3"><span className={`rounded-full px-2 py-1 text-[10px] font-semibold ${product.published === false ? "bg-amber-500/10 text-amber-600" : "bg-brand/10 text-brand"}`}>{product.published === false ? "Draft" : "Published"}</span></td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <Link href={`/admin/products/${product.id}`} className="inline-flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-2 text-[11px] font-medium"><Edit3 className="h-3.5 w-3.5" /> Edit</Link>
                      <DeleteProductButton id={product.id} name={product.name} />
                    </div>
                  </td>
                </tr>
              ))}
              {!products.length ? (
                <tr><td colSpan={8} className="px-4 py-12 text-center text-sm text-muted-foreground">No products in this group yet.</td></tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
