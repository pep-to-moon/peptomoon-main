import type { Metadata, Viewport } from "next";
import { Inter, Saira } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { AnalyticsLoader, ConsentBanner } from "@/components/layout/consent";
import { MotionProvider } from "@/components/motion/motion-provider";
import { JsonLd } from "@/components/seo/json-ld";
import { ogImageFor, ogSize } from "@/lib/seo/og";
import { organizationSchema, websiteSchema } from "@/lib/seo/schema";

// Display: Saira, an open-licence squared grotesque chosen as the closest match to the typography reference.
// Body: Inter, the free stand-in for the Helvetica Neue used by the reference.
const display = Saira({ subsets: ["latin"], axes: ["wdth"], variable: "--font-saira", display: "swap" });
const sans = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: `${siteConfig.name} | ${siteConfig.tagline}`, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large", "max-video-preview": -1 },
  },
  openGraph: { siteName: siteConfig.name, locale: siteConfig.locale, images: [{ url: ogImageFor("/"), ...ogSize, alt: siteConfig.name }] },
  twitter: { card: "summary_large_image", images: [ogImageFor("/")] },
  ...(siteConfig.analytics.gscVerification
    ? { verification: { google: siteConfig.analytics.gscVerification } }
    : {}),
};

export const viewport: Viewport = {
  themeColor: "#FFFDF7",
  width: "device-width",
  initialScale: 1,
};

/**
 * The "js" class lets CSS hide not-yet-revealed elements. If the motion layer has not reported ready within
 * four seconds the class is removed again, so a script failure can never leave content invisible.
 */
const jsFlag = `document.documentElement.classList.add('js');setTimeout(function(){var d=document.documentElement;if(!d.classList.contains('motion-ready'))d.classList.remove('js')},4000)`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: jsFlag }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-blue focus:px-5 focus:py-3 focus:font-bold focus:text-white"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <MotionProvider />
        <ConsentBanner />
        <AnalyticsLoader />
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
      </body>
    </html>
  );
}
