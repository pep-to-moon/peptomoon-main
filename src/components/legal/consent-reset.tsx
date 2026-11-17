"use client";

import { Button } from "@/components/ui/button";

/** Clears the stored analytics choice so the banner asks again. */
export function ConsentReset() {
  return (
    <Button
      variant="secondary"
      onClick={() => {
        try {
          window.localStorage.removeItem("pm-consent");
        } catch {
          /* storage unavailable, nothing to clear */
        }
        window.dispatchEvent(new Event("pm-consent"));
      }}
    >
      Change my cookie choice
    </Button>
  );
}
