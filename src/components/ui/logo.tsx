import Image from "next/image";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * The Peptomoon logo. The dark version is for light backgrounds and the white version is for the navy footer and menu.
 * Both are cut from the supplied master in public/brand, with the yellow arrow kept in each. The files are padded so the
 * lettering, not the taller box that includes the arrow, sits at the vertical centre of the image.
 */
export function Logo({ className, tone = "dark", priority = false }: { className?: string; tone?: "dark" | "light"; priority?: boolean }) {
  return (
    <Image
      src={tone === "light" ? "/brand/peptomoon-wordmark-light.webp" : "/brand/peptomoon-wordmark.webp"}
      alt={siteConfig.name}
      width={900}
      height={256}
      priority={priority}
      className={cn("h-11 w-auto select-none sm:h-12", className)}
    />
  );
}
