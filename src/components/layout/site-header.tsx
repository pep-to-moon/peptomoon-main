import { primaryNav } from "@/config/nav";
import { pillars } from "@/content/pillars";
import { servicesByPillar } from "@/content/services";
import { HeaderClient } from "./header-client";

/** Server wrapper: derives lightweight menu data so service content stays out of the client bundle. */
export function SiteHeader() {
  const columns = pillars.map((p) => ({
    key: p.key,
    index: p.index,
    label: p.label,
    verb: p.verb,
    blurb: p.blurb,
    items: servicesByPillar(p.key).map((s) => ({ name: s.name, href: `/services/${s.slug}`, summary: s.summary })),
  }));
  return <HeaderClient columns={columns} nav={primaryNav} />;
}
