import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";
import { siteConfig } from "@/config/site";

// The Clarity ID goes into an inline script, so only a plain letters-and-digits ID is ever accepted.
const CLARITY_ID = /^[a-z0-9]{6,20}$/i;

/** Loads Google Analytics 4 and Microsoft Clarity on every page. An ID that is not set means that tool does not load. */
export function AnalyticsLoader() {
  const { gaId, clarityId } = siteConfig.analytics;
  return (
    <>
      {gaId ? <GoogleAnalytics gaId={gaId} /> : null}
      {clarityId && CLARITY_ID.test(clarityId) ? (
        <Script
          id="ms-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${clarityId}");`,
          }}
        />
      ) : null}
    </>
  );
}
