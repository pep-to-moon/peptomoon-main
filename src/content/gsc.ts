/**
 * Google Search Console performance data, imported from each site owner's own exports (see data/gsc/README.md).
 * Nothing here is typed by hand: `pnpm import:gsc` regenerates gsc-data.ts from the CSV files, so every figure shown
 * on the site is one Search Console reported. With no data imported, the reach section renders nothing.
 */
export type GscPoint = {
  /** First day of the week, YYYY-MM-DD (Monday). */
  date: string;
  clicks: number;
  impressions: number;
  /** Click-through rate as a fraction, 0 to 1. */
  ctr: number;
  /** Average position, impression-weighted. Lower is better. */
  position: number;
};

/** A slice of clicks, by country or by device. Individual search queries are never stored or published. */
export type GscShare = { name: string; clicks: number; impressions: number };

export type GscSite = {
  /** Anonymous key, such as "store-1". No site name, domain or slug is ever stored. */
  id: string;
  /** Display label, such as "Store 1". */
  label: string;
  /** First and last day covered by the export. */
  from: string;
  to: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
  weekly: GscPoint[];
  /** Top countries by clicks. */
  countries: GscShare[];
  devices: GscShare[];
  /** Date the owner exported the report. */
  exportedOn: string;
};
