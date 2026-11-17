import Image from "next/image";
import { Marquee } from "@/components/ui/marquee";
import { portfolio } from "@/content/portfolio";

/** Decorative strip of the six real portfolio screenshots, drifting slowly. Hover pauses it. */
export function ShotStrip({ className }: { className?: string }) {
  return (
    <div aria-hidden className={className}>
      <Marquee pauseOnHover className="p-0 [--duration:80s] [--gap:1.25rem] sm:[--gap:1.5rem]">
        {portfolio.map((p) => (
          <div
            key={p.slug}
            className="relative h-[13rem] w-[20.5rem] shrink-0 overflow-hidden rounded-[1.125rem] bg-white ring-1 ring-ink/10 sm:h-[16rem] sm:w-[25rem]"
          >
            <Image src={p.images.desktop.src} alt="" fill sizes="(min-width: 640px) 400px, 328px" className="object-cover object-top" />
          </div>
        ))}
      </Marquee>
    </div>
  );
}
