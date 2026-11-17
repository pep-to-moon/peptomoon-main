import type { Verified } from "../types";

const TODAY = "2026-11-17";

export const verified = <T>(value: T, source: string): Verified<T> => ({
  value,
  source,
  verifiedOn: TODAY,
  status: "verified",
});

export const unconfirmed = <T>(value: T, source = "Awaiting owner confirmation"): Verified<T> => ({
  value,
  source,
  verifiedOn: TODAY,
  status: "needs-confirmation",
});
