import { Marquee } from "@/components/ui/marquee";
import { cn } from "@/lib/utils";

const words = ["Websites", "Payments", "Suppliers", "Fulfillment", "Dashboards", "Affiliates", "Email", "Compliance review"];

/** Oversized words moving across the page, a divider pattern used on the awsmd reference. Decorative. */
export function WordsMarquee() {
  return (
    <div aria-hidden className="overflow-hidden py-[clamp(2.5rem,6vw,5rem)]">
      <Marquee pauseOnHover repeat={3} className="[--duration:70s] [--gap:3rem]">
        {words.map((w, i) => (
          <span key={w} className="flex items-center gap-12">
            <span className={cn("marquee-word", i % 2 === 1 && "marquee-outline")}>{w}</span>
            <span className="size-3 rounded-full bg-yellow sm:size-4" />
          </span>
        ))}
      </Marquee>
    </div>
  );
}
