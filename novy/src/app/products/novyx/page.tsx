import type { Metadata } from "next";
import Link from "@/components/layout/localized-link";
import { ArrowDown, ArrowLeftRight, ArrowRight, ArrowUpRight, Check, Plus } from "lucide-react";
import { HeroHelixBackdrop } from "@/components/about/HeroHelixBackdrop";
import { Container } from "@/components/layout/container";
import { NovyxBeforeAfter } from "@/components/novyx/novyx-before-after";
import { NovyxScrollReveal } from "@/components/novyx/novyx-scroll-reveal";
import { NovyxStaticVial } from "@/components/novyx/novyx-static-vial";
import { NovyxVialVisual } from "@/components/novyx/novyx-vial-visual";
import { ROUTES } from "@/lib/constants/routes";
import { getServerLocale } from "@/i18n/server";
import { localizedAlternates, openGraphLocale } from "@/i18n/paths";
import { tr } from "@/i18n/config";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  return {
    alternates: localizedAlternates("/products/novyx", locale),
    title: "Skin Booster",
    description: tr(
      locale,
      "Discover the NŌVYX GHK-Cu skin booster, a professional formula developed around skin renewal and long-term skin quality.",
      "Entdecken Sie den NŌVYX GHK-Cu Skin Booster, eine professionelle Formel für sichtbare Hauterneuerung und langfristige Hautqualität.",
    ),
    openGraph: {
      locale: openGraphLocale(locale),
      title: "Skin Booster | NŌVYX",
      images: [{ url: "/products/novyx-ghk-cu-vial.png", alt: "NŌVYX GHK-Cu vial" }],
    },
  };
}

export default async function NovyxSkinBoosterPage() {
  const locale = await getServerLocale();
  const t = (english: string, german: string) => tr(locale, english, german);

  const formula = [
    {
      number: "01",
      ingredient: "GHK-Cu",
      role: t("The skin-focused lead active", "Der führende Wirkstoff für die Haut"),
      detail: t(
        "This copper-binding active sits at the center of the formula and is studied for its relationship with skin repair signaling and extracellular-matrix activity.",
        "Dieser kupferbindende Wirkstoff steht im Zentrum der Formel und wird im Zusammenhang mit Reparatursignalen der Haut und der extrazellulären Matrix untersucht.",
      ),
    },
    {
      number: "02",
      ingredient: "SNAP-8",
      role: t("Expression-line focus", "Fokus auf Mimikfalten"),
      detail: t(
        "A biomimetic active selected for focused care of the appearance of expression-related lines.",
        "Ein biomimetischer Wirkstoff für die gezielte Pflege des Erscheinungsbildes mimikbedingter Linien.",
      ),
    },
    {
      number: "03",
      ingredient: "PN + micro-PDRN",
      role: t("The renewal matrix", "Die Erneuerungsmatrix"),
      detail: t(
        "A supporting matrix selected for skin condition, visible renewal, texture and resilience.",
        "Eine ergänzende Matrix für Hautzustand, sichtbare Erneuerung, Textur und Widerstandsfähigkeit.",
      ),
    },
    {
      number: "04",
      ingredient: t("Growth factors + support complex", "Wachstumsfaktoren + Ergänzungskomplex"),
      role: t("A coordinated support network", "Ein abgestimmtes Unterstützungsnetzwerk"),
      detail: t(
        "EGF, FGF and additional actives complete the network alongside hyaluronic acid, collagen, glutathione, adenosine and amino acids.",
        "EGF, FGF und weitere Wirkstoffe ergänzen das Netzwerk zusammen mit Hyaluronsäure, Kollagen, Glutathion, Adenosin und Aminosäuren.",
      ),
    },
  ];

  const outcomes = [
    {
      title: t("Firmness & elasticity", "Festigkeit & Elastizität"),
      detail: t(
        "A GHK-Cu-led approach to the appearance of firmer, more elastic skin.",
        "Ein Ansatz mit GHK-Cu für das Erscheinungsbild festerer, elastischerer Haut.",
      ),
    },
    {
      title: t("Fine-line care", "Pflege feiner Linien"),
      detail: t(
        "SNAP-8 brings a focused dimension to the care of expression-related lines.",
        "SNAP-8 ergänzt die gezielte Pflege mimikbedingter Linien.",
      ),
    },
    {
      title: t("Skin structure", "Hautstruktur"),
      detail: t(
        "GHK-Cu and the supporting complex are selected for their relevance to collagen-related and extracellular-matrix research.",
        "GHK-Cu und der ergänzende Komplex wurden aufgrund ihrer Relevanz für die Forschung an Kollagen und extrazellulärer Matrix ausgewählt.",
      ),
    },
    {
      title: t("Texture & smoothness", "Textur & Geschmeidigkeit"),
      detail: t(
        "The combined formula is designed around a smoother, more refined-looking surface.",
        "Die kombinierte Formel ist auf eine glatter und ebenmäßiger wirkende Hautoberfläche ausgerichtet.",
      ),
    },
  ];

  const specifications = [
    [t("Product", "Produkt"), "NŌVYX GHK-Cu Skin Booster"],
    [t("Presentation", "Darreichung"), t("Sterile, ready-to-use liquid", "Sterile, gebrauchsfertige Flüssigkeit")],
    [t("Vial size", "Fläschchengröße"), "5 mL"],
    [t("Box", "Packung"), t("5 single-use vials", "5 Einwegfläschchen")],
    [t("Origin", "Herkunft"), t("Engineered and made in Germany", "In Korea entwickelt und hergestellt")],
    [t("Production", "Produktion"), t("GMP and ISO-certified production, as stated in the product brochure", "GMP- und ISO-zertifizierte Produktion laut Produktbroschüre")],
    [t("Storage", "Lagerung"), t("Room temperature, per product brochure", "Raumtemperatur laut Produktbroschüre")],
    [t("Shelf life", "Haltbarkeit"), t("2 years, per product brochure", "2 Jahre laut Produktbroschüre")],
    [t("Use", "Anwendung"), t("For professional use only", "Nur für professionelle Anwendung")],
  ];

  const questions = [
    {
      question: t("What defines the NŌVYX formula?", "Was zeichnet die NŌVYX Formel aus?"),
      answer: t(
        "It has a defined ingredient hierarchy led by GHK-Cu, with SNAP-8, a PN and micro-PDRN matrix, growth factors and supporting actives rather than an undifferentiated ingredient blend.",
        "Die Inhaltsstoffe folgen einer klaren Hierarchie: GHK-Cu steht im Mittelpunkt, ergänzt durch SNAP-8, eine PN- und micro-PDRN-Matrix, Wachstumsfaktoren und weitere Wirkstoffe.",
      ),
    },
    {
      question: t("Why is GHK-Cu central to the formula?", "Warum steht GHK-Cu im Mittelpunkt der Formel?"),
      answer: t(
        "GHK-Cu is a naturally occurring copper-binding compound studied in skin biology. The NŌVYX formula places it at the center of its skin-focused ingredient system.",
        "GHK-Cu ist eine natürlich vorkommende, kupferbindende Verbindung, die in der Hautbiologie untersucht wird. Die NŌVYX Formel stellt sie in den Mittelpunkt ihres hautorientierten Systems.",
      ),
    },
    {
      question: t("How is the NŌVYX skin booster presented?", "In welcher Form wird der NŌVYX Skin Booster angeboten?"),
      answer: t(
        "The brochure describes a sterile, ready-to-use liquid made in Germany and supplied as five single-use 5 mL vials. Refer to the supplied labeling for handling and use.",
        "Die Broschüre beschreibt eine sterile, gebrauchsfertige Flüssigkeit aus Korea in fünf Einwegfläschchen à 5 mL. Für Handhabung und Anwendung gelten die Produktangaben.",
      ),
    },
    {
      question: t("Who is the product intended for?", "Für wen ist das Produkt vorgesehen?"),
      answer: t(
        "The NŌVYX skin booster is presented for professional use in facial skin-quality care, with a focus on visible texture, firmness and early signs of ageing.",
        "Der NŌVYX Skin Booster ist für die professionelle Pflege der Gesichtshautqualität vorgesehen, mit Fokus auf sichtbare Textur, Festigkeit und frühe Zeichen der Hautalterung.",
      ),
    },
  ];

  return (
    <div data-novyx-scroll-root className="overflow-hidden bg-background text-foreground">
      <NovyxScrollReveal />
      <section className="relative isolate overflow-hidden border-b border-border bg-background pt-32 sm:pt-36 lg:pt-40">
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[420px] sm:h-[600px] lg:h-[680px]">
          <HeroHelixBackdrop intensity="normal" className="absolute inset-0 opacity-35 sm:opacity-55 dark:opacity-45 dark:sm:opacity-65" />
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background via-background/80 to-transparent sm:h-40" />
        </div>
        <Container size="xl" className="relative grid items-center gap-8 pb-16 lg:grid-cols-[1.04fr_0.96fr] lg:gap-4 lg:pb-24">
          <div className="relative z-10 min-w-0 max-w-2xl">
            <div className="mb-7 flex flex-wrap items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-brand sm:text-xs">
              <Link href={ROUTES.skinBoosters} className="rounded-full border border-brand/25 bg-brand/10 px-3 py-1.5 transition hover:bg-brand/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand">NŌVYX / Skin Boosters</Link>
              <span className="text-muted-foreground">{t("Professional formula", "Professionelle Formel")}</span>
            </div>
            <h1 className="max-w-2xl font-display text-[clamp(2.75rem,5.8vw,5rem)] font-extrabold leading-[0.96] tracking-[-0.065em] text-foreground">
              <span className="block">Skin</span>{" "}
              <span className="block text-brand">Booster</span>
            </h1>
            <p className="mt-5 font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-foreground-secondary sm:text-xs">
              NŌVYX / GHK-Cu
            </p>
            <h2 className="mt-9 max-w-xl font-display text-3xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl">
              {t("Skin renewal.", "Hauterneuerung.")} <span className="text-brand">{t("Skin longevity.", "Langfristige Hautqualität.")}</span>
            </h2>
            <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
              {t(
                "A GHK-Cu-led professional formula developed around the appearance of smoother, firmer skin today and proactive care for skin quality over time.",
                "Eine professionelle Formel mit GHK-Cu für das Erscheinungsbild glatterer, festerer Haut heute und die vorausschauende Pflege der Hautqualität im Lauf der Zeit.",
              )}
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {[t("GHK-Cu first", "GHK-Cu im Mittelpunkt"), "5 × 5 mL", t("Ready to use", "Gebrauchsfertig"), t("Professional use", "Professionelle Anwendung")].map((item) => (
                <span key={item} className="rounded-full border border-border bg-surface/80 px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-foreground-secondary shadow-sm">
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="#formula" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-brand px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_-10px_rgba(27,77,255,0.5)] transition hover:bg-brand-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2">
                {t("Explore the formula", "Formel entdecken")} <ArrowDown className="size-4" aria-hidden="true" />
              </Link>
              <Link href={ROUTES.contact} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-border bg-surface/80 px-6 py-3 text-sm font-semibold text-foreground transition hover:border-brand/40 hover:bg-surface-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2">
                {t("Request product details", "Produktinformationen anfragen")} <ArrowUpRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
          <div className="relative min-w-0 min-h-[440px] sm:min-h-[590px]">
            <div aria-hidden="true" className="absolute inset-[15%] rounded-full border border-brand/15 bg-[radial-gradient(circle,rgba(27,77,255,0.13),transparent_68%)]" />
            <NovyxVialVisual />
            <div className="absolute bottom-4 right-2 rounded-xl border border-brand/20 bg-surface/85 px-4 py-3 shadow-lg backdrop-blur-sm sm:bottom-12 sm:right-0">
              <span className="block font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">{t("Lead active", "Leitwirkstoff")}</span>
              <span className="mt-1 block font-display text-xl font-bold text-brand">GHK-Cu <span className="text-xs font-medium text-foreground-secondary">/ Cu²⁺</span></span>
            </div>
          </div>
        </Container>
      </section>

      <section id="approach" aria-labelledby="approach-heading" className="scroll-mt-28 py-20 sm:py-28">
        <Container size="xl" data-novyx-reveal>
          <p className="micro-label text-brand">{t("One formula / two objectives", "Eine Formel / zwei Ziele")}</p>
          <h2 id="approach-heading" className="mt-4 max-w-3xl font-display text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
            {t("Renew what is visible.", "Sichtbares erneuern.")}<br />
            <span className="text-brand">{t("Care for what comes next.", "Für morgen vorsorgen.")}</span>
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground">
            {t(
              "The NŌVYX formula connects visible skin renewal with a long-term approach to facial skin quality.",
              "Die NŌVYX Formel verbindet sichtbare Hauterneuerung mit einem langfristigen Ansatz für die Qualität der Gesichtshaut.",
            )}
          </p>
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            <article className="surface-card relative overflow-hidden p-7 sm:p-10">
              <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-brand">{t("Renewal", "Erneuerung")}</span>
              <h3 className="mt-8 font-display text-2xl font-bold sm:text-3xl">{t("Skin renewal", "Hauterneuerung")}</h3>
              <p className="mt-4 max-w-md text-sm leading-7 text-muted-foreground sm:text-base">
                {t("A formula centered on GHK-Cu and supported by a broader active complex for the appearance of smoother, more refined skin.", "Eine Formel mit GHK-Cu im Mittelpunkt, ergänzt durch einen breiteren Wirkstoffkomplex für das Erscheinungsbild glatterer, ebenmäßigerer Haut.")}
              </p>
              <div aria-hidden="true" className="absolute -bottom-16 -right-8 size-48 rounded-full border-[28px] border-brand/5" />
            </article>
            <article className="surface-card relative overflow-hidden p-7 sm:p-10">
              <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-brand">{t("Longevity", "Langfristige Pflege")}</span>
              <h3 className="mt-8 font-display text-2xl font-bold sm:text-3xl">{t("Skin longevity", "Langfristige Hautqualität")}</h3>
              <p className="mt-4 max-w-md text-sm leading-7 text-muted-foreground sm:text-base">
                {t("A proactive approach focused on maintaining the appearance of firmness, elasticity and resilience before advanced signs of ageing appear.", "Ein vorausschauender Ansatz, der das Erscheinungsbild von Festigkeit, Elastizität und Widerstandsfähigkeit pflegt, bevor fortgeschrittene Alterszeichen sichtbar werden.")}
              </p>
              <div aria-hidden="true" className="absolute -bottom-16 -right-8 size-48 rounded-full border-[28px] border-brand/5" />
            </article>
          </div>
        </Container>
      </section>

      <section id="formula" aria-labelledby="formula-heading" className="scroll-mt-28 border-y border-border bg-background-subtle py-20 sm:py-28">
        <Container size="xl" data-novyx-reveal>
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <p className="micro-label text-brand">{t("Ingredient architecture", "Inhaltsstoff-Architektur")}</p>
              <h2 id="formula-heading" className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
                {t("A formula with a clear lead.", "Eine Formel mit klarem Mittelpunkt.")}
              </h2>
              <p className="mt-5 max-w-md text-base leading-7 text-muted-foreground">
                {t("Each layer has a defined role. GHK-Cu leads; the remaining ingredients build a coordinated skin-quality system around it.", "Jede Ebene erfüllt eine klare Aufgabe. GHK-Cu steht im Mittelpunkt; die weiteren Inhaltsstoffe bilden ein abgestimmtes System für die Hautqualität.")}
              </p>
              <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-brand/25 bg-brand/10 px-4 py-2 font-mono text-xs font-semibold text-brand">
                <span className="size-2 rounded-full bg-brand" aria-hidden="true" /> GHK-Cu / {t("Core active", "Zentraler Wirkstoff")}
              </div>
            </div>
            <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-[var(--card-shadow)]">
              {formula.map((item) => (
                <article key={item.number} className="grid gap-4 border-b border-border p-5 last:border-b-0 sm:grid-cols-[3.5rem_1fr] sm:p-7">
                  <span className="font-mono text-sm font-semibold text-brand">{item.number}</span>
                  <div>
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="font-display text-lg font-bold sm:text-xl">{item.ingredient}</h3>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-brand">{item.role}</span>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.detail}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section aria-labelledby="outcomes-heading" className="py-20 sm:py-28">
        <Container size="xl" data-novyx-reveal>
          <p className="micro-label text-brand">{t("Skin-quality focus", "Fokus auf Hautqualität")}</p>
          <h2 id="outcomes-heading" className="mt-4 max-w-3xl font-display text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
            {t("Four dimensions of better-looking skin.", "Vier Aspekte schöner wirkender Haut.")}
          </h2>
          <div className="mt-11 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {outcomes.map((outcome) => (
              <article key={outcome.title} className="surface-card min-h-60 p-6">
                <span className="flex size-8 items-center justify-center rounded-full bg-brand/10 text-brand"><Check className="size-4" aria-hidden="true" /></span>
                <h3 className="mt-7 font-display text-lg font-bold leading-snug">{outcome.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{outcome.detail}</p>
              </article>
            ))}
          </div>
          <p className="mt-6 max-w-3xl text-xs leading-6 text-muted-foreground">
            {t("These are formulation goals described in the supplied product brochure. Research on individual ingredients does not establish clinical results for the finished product.", "Dies sind Formulierungsziele aus der bereitgestellten Produktbroschüre. Studien zu einzelnen Inhaltsstoffen belegen keine klinischen Ergebnisse des fertigen Produkts.")}
          </p>
        </Container>
      </section>

      <section id="before-after" aria-labelledby="comparison-heading" className="border-t border-border bg-background-subtle py-20 sm:py-28">
        <Container size="xl" data-novyx-reveal className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="lg:pr-4">
            <p className="micro-label flex items-center gap-3 text-brand"><span aria-hidden="true" className="h-px w-6 bg-brand" />{t("Visualising the concept", "Das Konzept visualisieren")}</p>
            <h2 id="comparison-heading" className="mt-6 max-w-lg font-display text-4xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-5xl">
              {t("See the", "Den")}{" "}
              <span className="italic text-brand">{t("difference", "Unterschied")}</span>
              {" "}{t("in detail.", "im Detail sehen.")}
            </h2>
            <p className="mt-6 max-w-lg text-base leading-8 text-muted-foreground">
              {t(
                "Explore a creative comparison of skin appearance. Drag the portrait to inspect the visual direction behind NŌVYX.",
                "Entdecken Sie einen kreativen Vergleich des Hautbilds. Bewegen Sie den Regler, um die visuelle Ausrichtung hinter NŌVYX zu betrachten.",
              )}
            </p>
            <p className="mt-8 inline-flex items-center gap-3 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-brand">
              <ArrowLeftRight className="size-5" aria-hidden="true" />
              {t("Drag to compare", "Zum Vergleichen ziehen")}
            </p>
            <div className="mt-8 max-w-lg border-t border-border pt-5 text-xs leading-6 text-muted-foreground">
              {t(
                "Illustrative, digitally generated visualisation. No product efficacy or individual improvement is implied.",
                "Illustrative, digital erstellte Darstellung. Sie macht keine Aussage über Produktwirksamkeit oder individuelle Verbesserungen.",
              )}
            </div>
          </div>
          <NovyxBeforeAfter />
        </Container>
      </section>

      <section id="specifications" aria-labelledby="specifications-heading" className="scroll-mt-28 border-y border-border bg-background-subtle py-20 sm:py-28">
        <Container size="xl" data-novyx-reveal className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-16">
          <div>
            <p className="micro-label text-brand">{t("Professional presentation", "Professionelle Präsentation")}</p>
            <h2 id="specifications-heading" className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
              {t("Practical by design.", "Praxisnah entwickelt.")}
            </h2>
            <p className="mt-5 max-w-md text-base leading-7 text-muted-foreground">
              {t("A ready-to-use presentation with a defined ingredient system and a clear professional-use format.", "Eine gebrauchsfertige Präsentation mit definiertem Inhaltsstoffsystem und klarer Form für die professionelle Anwendung.")}
            </p>
            <p className="mt-8 inline-flex items-center gap-2 rounded-full border border-brand/25 bg-brand/10 px-4 py-2 font-mono text-xs font-semibold text-brand">
              <span className="size-2 rounded-full bg-brand" aria-hidden="true" /> {t("For professional use only", "Nur für professionelle Anwendung")}
            </p>
            <div
              role="img"
              aria-label={t("NŌVYX GHK-Cu Skin Booster vial", "NŌVYX GHK-Cu Skin Booster Fläschchen")}
              className="relative mt-8 flex h-72 items-center justify-center overflow-hidden rounded-xl border border-brand/10 bg-[radial-gradient(circle_at_50%_55%,rgba(27,77,255,0.12),transparent_67%)] lg:h-64"
            >
              <div aria-hidden="true" className="pointer-events-none absolute inset-x-[18%] bottom-4 h-9 rounded-full bg-brand/15 blur-xl" />
              <NovyxStaticVial className="h-64 lg:h-56" sizes="(max-width: 1024px) 190px, 170px" />
            </div>
          </div>
          <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-[var(--card-shadow)]">
            <table className="w-full border-collapse text-left text-sm">
              <caption className="sr-only">{t("NŌVYX product specifications", "NŌVYX Produktspezifikationen")}</caption>
              <tbody>
                {specifications.map(([label, value]) => (
                  <tr key={label} className="border-b border-border last:border-b-0">
                    <th scope="row" className="w-2/5 px-5 py-4 align-top font-mono text-xs font-semibold uppercase tracking-wide text-foreground-secondary sm:px-7">{label}</th>
                    <td className="px-5 py-4 leading-6 text-foreground sm:px-7">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      <section aria-labelledby="faq-heading" className="py-20 sm:py-28">
        <Container size="lg" data-novyx-reveal>
          <p className="micro-label text-brand">{t("Product questions", "Fragen zum Produkt")}</p>
          <h2 id="faq-heading" className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-5xl">{t("Frequently asked.", "Häufig gefragt.")}</h2>
          <div className="mt-10 divide-y divide-border rounded-xl border border-border bg-surface px-5 sm:px-8">
            {questions.map((item) => (
              <details key={item.question} className="group py-5">
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 font-display text-base font-semibold marker:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand sm:text-lg [&::-webkit-details-marker]:hidden">
                  {item.question}
                  <Plus className="size-5 shrink-0 text-brand transition-transform group-open:rotate-45" aria-hidden="true" />
                </summary>
                <p className="max-w-3xl pb-2 pr-8 text-sm leading-7 text-muted-foreground sm:text-base">{item.answer}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-border bg-background-subtle py-20 sm:py-24">
        <Container size="lg" data-novyx-reveal>
          <div className="surface-card flex flex-col gap-8 p-7 sm:p-10 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="micro-label text-brand">NŌVYX / GHK-CU</p>
              <h2 className="mt-4 max-w-xl font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                {t("Explore the professional dossier.", "Professionelle Produktunterlagen anfragen.")}
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground">
                {t("Contact NŌVYX for product information and professional inquiries.", "Kontaktieren Sie NŌVYX für Produktinformationen und professionelle Anfragen.")}
              </p>
            </div>
            <Link href={ROUTES.contact} className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-md bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2">
              {t("Contact NŌVYX", "NŌVYX kontaktieren")} <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
