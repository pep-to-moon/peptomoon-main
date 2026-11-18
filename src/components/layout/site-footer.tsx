import Link from "next/link";
import { ParticlesBg } from "@/components/motion/particles-bg";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { ButtonLink } from "@/components/ui/button";
import { companyNav, footerDisclaimer, legalNav, startOptions } from "@/config/nav";
import { siteConfig } from "@/config/site";
import { services } from "@/content/services";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const email = siteConfig.contact.email;
  return (
    <footer className="px-2.5 pb-2.5 pt-1.5 sm:px-3 sm:pb-3">
      <div className="panel on-dark relative overflow-hidden bg-navy text-white">
        <ParticlesBg
          particleCount={55}
          particleColors={["#99d6ea", "#6798c0"]}
          hoverEffect="attract"
          hoverRadius={160}
          speed={0.05}
          opacity={0.55}
          glow={0.3}
          pixelRatio={1}
          clickBurst={false}
          disableRotation
        />
        <div className="container-x relative pt-[clamp(4rem,9vw,8rem)]">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="eyebrow">Let&apos;s talk</p>
              <h2 className="display display-xl mt-6 max-w-[13ch]">Tell us what you need.</h2>
            </div>
            <div className="lg:col-span-4">
              <p className="max-w-[40ch] text-white/75">
                A short questionnaire tells us where you are. We read every answer and reply to you directly.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <ButtonLink href="/contact" size="lg" variant="light">
                  Start a project
                </ButtonLink>
                {email && (
                  <a href={`mailto:${email}`} className="inline-flex min-h-8 items-center gap-1.5 font-display text-[0.85rem] font-bold uppercase tracking-[0.06em] underline underline-offset-[6px]">
                    {email}
                    <ArrowUpRight aria-hidden className="size-4" />
                  </a>
                )}
              </div>
            </div>
          </div>

          <ul className="mt-14 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
            {startOptions.map((o) => (
              <li key={o.status}>
                <Link
                  href={`/contact?status=${o.status}`}
                  className="group flex min-h-24 items-start justify-between gap-4 border-t border-white/25 py-5 transition-colors hover:border-white hover:text-sky"
                >
                  <span className="font-display text-[1.05rem] font-bold leading-snug">{o.label}</span>
                  <ArrowUpRight aria-hidden className="size-5 shrink-0 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-20 grid gap-12 border-t border-white/15 pt-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Logo tone="light" className="h-14 sm:h-16" />
              <p className="mt-5 max-w-[34ch] text-[0.95rem] text-white/65">{siteConfig.tagline}</p>
            </div>
            <nav aria-label="Services" className="lg:col-span-5">
              <h2 className="label text-white/50">Services</h2>
              <ul className="mt-5 grid gap-x-8 sm:grid-cols-2">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/services/${s.slug}`} className="flex min-h-10 items-center text-[0.95rem] text-white/85 transition-colors hover:text-sky">
                      {s.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="grid grid-cols-2 gap-8 lg:col-span-3">
              <nav aria-label="Company">
                <h2 className="label text-white/50">Company</h2>
                <ul className="mt-5">
                  {companyNav.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className="flex min-h-10 items-center text-[0.95rem] text-white/85 transition-colors hover:text-sky">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <nav aria-label="Legal">
                <h2 className="label text-white/50">Legal</h2>
                <ul className="mt-5">
                  {legalNav.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className="flex min-h-10 items-center text-[0.95rem] text-white/85 transition-colors hover:text-sky">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>

          <section aria-labelledby="footer-disclaimer" className="mt-12 grid gap-4 border-t border-white/15 pt-8 lg:grid-cols-12 lg:gap-10">
            <h2 id="footer-disclaimer" className="label text-white/60 lg:col-span-3">
              Disclaimer
            </h2>
            <div className="lg:col-span-9">
              <p className="max-w-[88ch] text-[0.85rem] leading-relaxed text-white/65">{footerDisclaimer}</p>
              <Link href="/disclaimer" className="mt-3 inline-flex min-h-10 items-center text-[0.85rem] font-semibold text-white underline underline-offset-4 transition-colors hover:text-sky">
                Read the full disclaimer
              </Link>
            </div>
          </section>

          <p className="py-8 text-[0.85rem] text-white/60">
            © {year} {siteConfig.legalName}. Services for businesses in the research-use-only peptide industry.
          </p>
        </div>

        {/* Decorative wordmark drawn with generated content so it is not treated as text. */}
        <div aria-hidden data-text={siteConfig.name} className="footer-mark" style={{ fontSize: "clamp(3rem, 15.5vw, 19rem)" }} />
      </div>
    </footer>
  );
}
