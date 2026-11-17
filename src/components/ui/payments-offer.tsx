import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { paymentsOfferHeadline, paymentsOfferQualifier } from "@/content/all-in-one";
import { cn } from "@/lib/utils";

/**
 * The 3% / no-rolling-reserve statement with its full qualifier, linking to /all-in-one#payments. Used on the homepage
 * and the payment processing service page so the claim and its qualifier are worded identically everywhere.
 */
export function PaymentsOffer({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-[1.25rem] bg-navy p-6 text-white sm:p-7", className)}>
      <Link
        href="/all-in-one#payments"
        className="group flex items-center justify-between gap-4 font-display text-[clamp(1.05rem,2.2vw,1.35rem)] font-bold uppercase leading-tight tracking-[0.02em] hover:text-sky"
      >
        <span>{paymentsOfferHeadline}</span>
        <span aria-hidden className="grid size-10 shrink-0 place-items-center rounded-full bg-white text-blue transition-transform group-hover:rotate-[-45deg]">
          <ArrowRight className="size-4" />
        </span>
      </Link>
      <p className="mt-4 max-w-[110ch] text-[0.78rem] leading-relaxed text-white/65">{paymentsOfferQualifier}</p>
    </div>
  );
}
