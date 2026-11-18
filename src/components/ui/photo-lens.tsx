"use client";

import { useRef } from "react";
import { Photo } from "@/components/ui/photo";
import { media, type MediaKey } from "@/content/media";

/**
 * A photograph with a magnifying lens that follows the mouse (the idea behind Magic UI's Lens). It shows the same
 * photograph at twice the size inside a circle. Mouse only; for everyone else it is just the photograph. The lens is
 * decorative and hidden from assistive technology.
 */
export function PhotoLens({
  name,
  zoom = 2.2,
  size = 168,
  ...photo
}: { name: MediaKey; zoom?: number; size?: number } & Omit<React.ComponentProps<typeof Photo>, "name" | "parallax" | "children">) {
  const box = useRef<HTMLDivElement>(null);
  const lens = useRef<HTMLDivElement>(null);
  const m = media[name];
  const src = `/_next/image?url=${encodeURIComponent(`/images/${m.file}.webp`)}&w=1920&q=75`;

  const move = (e: React.PointerEvent) => {
    const b = box.current;
    const l = lens.current;
    if (!b || !l || e.pointerType !== "mouse") return;
    const r = b.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    // The photograph fills the box like object-fit: cover, so map the pointer onto the covered image.
    const scale = Math.max(r.width / m.w, r.height / m.h);
    const iw = m.w * scale;
    const ih = m.h * scale;
    const ox = (r.width - iw) / 2;
    const oy = (r.height - ih) / 2;
    l.style.backgroundSize = `${iw * zoom}px ${ih * zoom}px`;
    l.style.backgroundPosition = `${size / 2 - (x - ox) * zoom}px ${size / 2 - (y - oy) * zoom}px`;
    l.style.transform = `translate3d(${x - size / 2}px, ${y - size / 2}px, 0)`;
    l.dataset.on = "true";
  };
  const leave = () => {
    if (lens.current) lens.current.dataset.on = "false";
  };

  return (
    <div ref={box} onPointerMove={move} onPointerLeave={leave} className="relative">
      <Photo name={name} parallax={0} {...photo} />
      <div
        ref={lens}
        aria-hidden
        data-on="false"
        className="photo-lens"
        style={{ width: size, height: size, backgroundImage: `url(${src})` }}
      />
    </div>
  );
}
