import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/section";
import { services } from "@/content/services";
import Link from "next/link";

export const metadata: Metadata = { title: { absolute: "Page not found" }, robots: { index: false, follow: false } };

export default function NotFound() {
  return (
    <div className="container-x pb-[clamp(5rem,12vw,10rem)] pt-[clamp(8rem,14vw,12rem)]">
      <Eyebrow index="404">Page not found</Eyebrow>
      <h1 className="display display-xl mt-8 max-w-[14ch]">That page is not here.</h1>
      <p className="mt-8 max-w-[52ch] text-[1.125rem] text-ink-soft">
        The link may be old or mistyped. Start from the home page, or jump to one of the services below.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <ButtonLink href="/">Back to home</ButtonLink>
        <ButtonLink href="/contact" variant="secondary">
          Tell us what you need
        </ButtonLink>
      </div>
      <ul className="mt-16 grid gap-x-6 gap-y-1 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <li key={s.slug}>
            <Link href={`/services/${s.slug}`} className="flex min-h-12 items-center rounded-full px-4 transition-colors hover:bg-white hover:text-blue">
              {s.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
