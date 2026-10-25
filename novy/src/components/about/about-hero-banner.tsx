import Image from "next/image";
import { Container } from "@/components/layout/container";
import { Atom, Dna, Sparkles } from "lucide-react";

interface AboutHeroBannerProps {
  badge: string;
  title: string;
  subtitle: string;
  scienceLabel: string;
  peptideLabel: string;
}

export function AboutHeroBanner({ badge, title, subtitle, scienceLabel, peptideLabel }: AboutHeroBannerProps) {
  return (
    <section className="relative mb-16 overflow-hidden border-y border-border/60 bg-background sm:rounded-[30px] sm:border">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_42%,rgba(49,110,255,0.20),transparent_24%),radial-gradient(circle_at_20%_20%,rgba(111,180,255,0.08),transparent_26%),linear-gradient(120deg,#07101f_0%,#0a1424_44%,#0c1b31_100%)] dark:bg-[radial-gradient(circle_at_78%_42%,rgba(45,111,255,0.20),transparent_24%),radial-gradient(circle_at_20%_20%,rgba(113,186,255,0.07),transparent_26%),linear-gradient(120deg,#040912_0%,#08111f_46%,#0a1729_100%)]" />

      <div className="pointer-events-none absolute inset-0 opacity-80">
        <div className="absolute left-[6%] top-[18%] h-24 w-24 rounded-full bg-brand/10 blur-3xl" />
        <div className="absolute right-[12%] top-[8%] h-32 w-32 rounded-full bg-cyan-300/10 blur-3xl" />
        <div className="absolute bottom-[8%] right-[30%] h-40 w-40 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <Container size="xl" className="relative z-10">
        <div className="grid min-h-[590px] items-center gap-10 py-16 lg:grid-cols-[1.02fr_0.98fr] lg:py-20">
          <div className="relative z-20 max-w-2xl">
            <div className="mb-7 inline-flex items-center gap-4">
              <span className="font-mono text-[11px] uppercase tracking-[0.34em] text-white/65">
                {badge}
              </span>
              <span className="h-px w-16 bg-gradient-to-r from-cyan-300 to-brand" />
            </div>

            <h1 className="max-w-2xl font-sans text-5xl font-light leading-[0.94] tracking-[-0.05em] text-white sm:text-6xl lg:text-[5.2rem]">
              {title}
            </h1>

            <p className="mt-7 max-w-xl text-base font-light leading-relaxed text-white/68 sm:text-lg">
              {subtitle}
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-4 py-2.5 text-[11px] font-mono uppercase tracking-[0.16em] text-white/70 backdrop-blur-xl">
                <Atom className="h-3.5 w-3.5 text-cyan-300" />
                {scienceLabel}
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-4 py-2.5 text-[11px] font-mono uppercase tracking-[0.16em] text-white/70 backdrop-blur-xl">
                <Dna className="h-3.5 w-3.5 text-brand" />
                {peptideLabel}
              </div>
            </div>
          </div>

          <div className="relative mx-auto flex min-h-[430px] w-full max-w-[620px] items-center justify-center lg:min-h-[500px]">
            <div className="absolute inset-x-[3%] bottom-[8%] h-[28%] rounded-[50%] border border-white/10 bg-[radial-gradient(ellipse_at_center,rgba(70,142,255,0.28),rgba(15,31,53,0.60)_40%,rgba(7,14,26,0)_72%)] shadow-[0_0_90px_rgba(44,113,255,0.20)]" />

            <div className="absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 sm:h-[420px] sm:w-[420px]" />
            <div className="absolute left-1/2 top-1/2 h-[285px] w-[285px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand/20 sm:h-[345px] sm:w-[345px]" />
            <div className="absolute left-1/2 top-1/2 h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/15 sm:h-[270px] sm:w-[270px]" />

            <div className="absolute left-1/2 top-1/2 h-[72%] w-[72%] -translate-x-1/2 -translate-y-1/2 rotate-[-12deg] rounded-[50%] border border-white/10" />
            <div className="absolute left-1/2 top-1/2 h-[52%] w-[88%] -translate-x-1/2 -translate-y-1/2 rotate-[20deg] rounded-[50%] border border-cyan-300/10" />

            <div className="relative z-20 flex h-52 w-52 items-center justify-center rounded-full border border-white/15 bg-[radial-gradient(circle_at_40%_35%,rgba(255,255,255,0.18),rgba(27,77,255,0.12)_35%,rgba(5,12,24,0.88)_72%)] shadow-[0_0_70px_rgba(31,97,255,0.32),inset_0_0_55px_rgba(255,255,255,0.06)] backdrop-blur-2xl sm:h-64 sm:w-64">
              <div className="absolute inset-4 rounded-full border border-white/10" />
              <div className="absolute inset-9 rounded-full bg-[radial-gradient(circle,rgba(22,93,255,0.52),rgba(5,12,24,0.08)_68%)] blur-xl" />
              <Image
                src="/novyx-icon.webp"
                alt="NŌVYX"
                width={260}
                height={260}
                priority
                className="relative z-10 h-auto w-[74%] object-contain drop-shadow-[0_0_25px_rgba(66,132,255,0.45)]"
              />
            </div>

            <div className="absolute right-[7%] top-[9%] flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-white/[0.05] text-cyan-300 shadow-[0_0_30px_rgba(77,184,255,0.18)] backdrop-blur-xl">
              <Sparkles className="h-5 w-5" />
            </div>

            <div className="absolute left-[3%] top-[27%] h-6 w-6 rounded-full border border-white/25 bg-white/10 shadow-[0_0_18px_rgba(92,185,255,0.28)]" />
            <div className="absolute left-[13%] top-[18%] h-3.5 w-3.5 rounded-full bg-cyan-300/75 shadow-[0_0_16px_rgba(103,216,255,0.75)]" />
            <div className="absolute left-[9%] top-[20%] h-px w-14 rotate-[28deg] bg-gradient-to-r from-cyan-300/60 to-white/10" />

            <div className="absolute bottom-[18%] right-[5%] h-8 w-8 rounded-full border border-white/20 bg-white/[0.06] shadow-[0_0_24px_rgba(71,144,255,0.22)]" />
            <div className="absolute bottom-[11%] right-[18%] h-3 w-3 rounded-full bg-brand shadow-[0_0_14px_rgba(27,77,255,0.75)]" />
            <div className="absolute bottom-[15%] right-[10%] h-px w-14 -rotate-[22deg] bg-gradient-to-r from-white/10 to-brand/60" />

            <div className="absolute bottom-[3%] left-1/2 h-[20%] w-[54%] -translate-x-1/2 rounded-[50%] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(8,19,35,0.75))] shadow-[0_12px_50px_rgba(0,0,0,0.42),0_0_40px_rgba(43,102,255,0.12)] backdrop-blur-xl" />
          </div>
        </div>
      </Container>

      <div className="pointer-events-none absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-cyan-300/35 to-transparent" />
    </section>
  );
}
