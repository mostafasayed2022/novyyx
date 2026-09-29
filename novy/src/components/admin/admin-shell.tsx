import Link from "next/link";
import { Boxes, LayoutDashboard, Mail, ExternalLink, Images } from "lucide-react";
import { NovyxLogo } from "@/components/ui/novax-logo";
import { LogoutButton } from "./logout-button";

const nav = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Boxes },
  { href: "/admin/hero", label: "Hero", icon: Images },
  { href: "/admin/inquiries", label: "Inquiries", icon: Mail },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur-xl">
        <div className="mx-auto flex min-h-16 max-w-[1500px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-5">
            <Link href="/admin" className="flex items-center gap-3">
              <NovyxLogo height={34} />
              <span className="hidden text-[10px] font-mono font-semibold uppercase tracking-[0.16em] text-muted-foreground sm:inline">Control Center</span>
            </Link>
            <nav className="hidden items-center gap-1 md:flex">
              {nav.map(({ href, label, icon: Icon }) => (
                <Link key={href} href={href} className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-muted-foreground transition hover:bg-surface hover:text-foreground">
                  <Icon className="h-3.5 w-3.5" />
                  {label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/" target="_blank" className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-xs font-medium text-muted-foreground transition hover:text-foreground">
              <ExternalLink className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">View site</span>
            </Link>
            <LogoutButton />
          </div>
        </div>
        <nav className="flex overflow-x-auto border-t border-border/50 px-3 py-2 md:hidden">
          {nav.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href} className="inline-flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-muted-foreground">
              <Icon className="h-3.5 w-3.5" />
              {label}
            </Link>
          ))}
        </nav>
      </header>
      <main className="mx-auto w-full max-w-[1500px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">{children}</main>
    </div>
  );
}
