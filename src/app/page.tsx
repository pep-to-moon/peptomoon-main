import type { Metadata } from "next";
import { SiteIntro } from "@/components/layout/site-intro";
import { Hero } from "@/components/sections/home/hero";
import { Statement } from "@/components/sections/home/statement";
import { Problems } from "@/components/sections/home/problems";
import { PhotoBand } from "@/components/sections/home/photo-band";
import { Ecosystem } from "@/components/sections/home/ecosystem";
import { ServicesIndex } from "@/components/sections/home/services-index";
import { WordsMarquee } from "@/components/sections/home/words-marquee";
import { GscReach } from "@/components/sections/home/gsc-reach";
import { PortfolioShowcase } from "@/components/sections/home/portfolio-showcase";
import { WhatWeBuild } from "@/components/sections/home/what-we-build";
import { Operations } from "@/components/sections/home/operations";
import { Verify } from "@/components/sections/home/verify";
import { Growth } from "@/components/sections/home/growth";
import { Dashboards } from "@/components/sections/home/dashboards";
import { Process } from "@/components/sections/home/process";
import { WhyUs } from "@/components/sections/home/why-us";
import { HomeFaq } from "@/components/sections/home/faq";
import { PaymentsOffer } from "@/components/ui/payments-offer";
import { siteConfig } from "@/config/site";
import { gscSites } from "@/content/gsc-data";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: `${siteConfig.name} | RUO Peptide Business Infrastructure`,
  description:
    "One partner for RUO peptide businesses: websites, payments, supplier documentation, fulfillment, marketing systems, reporting and compliance review.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <SiteIntro />
      <Hero />
      <section aria-label="Payment processing" className="container-x pt-6">
        <PaymentsOffer />
      </section>
      <Statement />
      <Problems />
      <PhotoBand />
      <Ecosystem />
      <ServicesIndex />
      <WordsMarquee />
      <PortfolioShowcase />
      <GscReach sites={gscSites} />
      <WhatWeBuild />
      <Operations />
      <Verify />
      <Growth />
      <Dashboards />
      <Process />
      <WhyUs />
      <HomeFaq />
    </>
  );
}
