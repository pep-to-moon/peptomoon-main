import { Photo } from "@/components/ui/photo";
import { Reveal } from "@/components/ui/section";

/** A wide photograph that breaks up the long run of text sections on the home page. */
export function PhotoBand() {
  return (
    <section aria-label="Research-use-only infrastructure" className="container-x py-[clamp(1.5rem,4vw,3.5rem)]">
      <Photo name="lab-wide" ratio="21 / 9" sizes="(min-width: 1024px) 92vw, 100vw" parallax={8} radius="1.75rem">
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-navy/80 via-navy/30 to-transparent p-6 pt-24 text-white sm:p-10 sm:pt-32">
          <Reveal>
            <p className="label text-sky">Research use only</p>
            <p className="display mt-3 max-w-[22ch] text-[clamp(1.6rem,1rem+2.2vw,3rem)]">Infrastructure built around how this industry actually works.</p>
          </Reveal>
        </div>
      </Photo>
    </section>
  );
}
