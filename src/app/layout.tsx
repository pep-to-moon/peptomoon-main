import type { Metadata, Viewport } from "next";
import { Inter, Saira } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { AnalyticsLoader } from "@/components/layout/analytics";
import { ContactLauncher } from "@/components/layout/contact-launcher";
import { Cursor } from "@/components/motion/cursor";
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

/**
 * Decides, before first paint, whether the entrance runs: home page only, once per browser session (a new tab or window
 * is a new session), never for reduced motion, data-saver connections or automated browsers (crawlers, Lighthouse).
 * Failsafes clear it after about five seconds whatever happens, and without JavaScript the class is never set, so the
 * page is never covered. As soon as the hero's strip has been parsed it is centred on the screen and given its fast
 * slide (the same numbers as SLIDE_* in site-intro.tsx), so it is moving from the first paint, not after React loads.
 */
const introFlag = `try{var d=document.documentElement;if(location.pathname==='/'&&!matchMedia('(prefers-reduced-motion: reduce)').matches&&!navigator.webdriver&&!sessionStorage.getItem('pm-intro')&&!(navigator.connection&&navigator.connection.saveData)){d.classList.add('intro-active');var go=function(){var s=document.querySelector('[data-hero-strip]');if(!s)return false;var g=s.querySelectorAll('.animate-marquee');if(g.length<2)return false;var r=s.getBoundingClientRect();d.style.setProperty('--strip-dy',(innerHeight/2-(r.top+r.height/2))+'px');void s.offsetWidth;for(var i=0;i<g.length;i++)g[i].animate([{translate:'0 0'},{translate:'-1400px 0'}],{duration:2000,easing:'cubic-bezier(0.45, 0.28, 0.4, 1)',fill:'forwards'});window.__introT0=performance.now();d.classList.add('intro-strip-on');return true};if(!go()){var mo=new MutationObserver(function(){if(go())mo.disconnect()});mo.observe(d,{childList:true,subtree:true});setTimeout(function(){mo.disconnect()},4000)}setTimeout(function(){d.classList.remove('intro-active')},5200);setTimeout(function(){d.classList.remove('intro-landing','intro-exit','intro-skip')},9000)}}catch(e){}`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `${jsFlag};${introFlag}` }} />
      </head>
      {/* Browser extensions (antivirus and similar) add attributes to <body> before React loads; ignore those. */}
      <body suppressHydrationWarning>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-blue focus:px-5 focus:py-3 focus:font-bold focus:text-white"
        >
          Skip to content
        </a>
        <div aria-hidden className="scroll-progress" />
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <MotionProvider />
        <Cursor />
        <ContactLauncher />
        <AnalyticsLoader />
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
      </body>
    </html>
  );
}
