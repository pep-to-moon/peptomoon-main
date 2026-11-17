"use client";

import { Button } from "@/components/ui/button";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="container-x pb-[clamp(5rem,12vw,10rem)] pt-[clamp(8rem,14vw,12rem)]">
      <p className="eyebrow">Something went wrong</p>
      <h1 className="display display-xl mt-6 max-w-[14ch]">This page could not load.</h1>
      <p className="mt-6 max-w-[50ch] text-[1.125rem] text-ink-soft">Try again. If it keeps happening, please let us know through the contact page.</p>
      <Button className="mt-8" size="lg" arrow onClick={() => reset()}>
        Try again
      </Button>
    </div>
  );
}
