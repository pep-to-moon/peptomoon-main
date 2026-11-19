/**
 * Every photograph on the site, in one place.
 *
 * Each slot is a file at /public/images/<file>.webp. `file` is a descriptive file name (search engines read it), `topic`
 * is the phrase that ties the photo to what the page is about, and `query` says what a replacement photo should show.
 * `hue` colors the placeholder art used for any slot that has no real photo yet (see scripts/make-media.ts and
 * scripts/fetch-images.ts).
 *
 * House rule: no photograph may show a recognizable face. Choose hands, objects, environments or people cropped at the
 * neck. Check every new photo by eye, because nothing in the fetch scripts can do it for you.
 *
 * Alt text is written as "<what the photo shows>, <topic>". The first part comes from src/content/media-credits.json
 * (a true description of the real photo); the second part is the topic below or a page-specific one passed to <Photo>.
 * It must describe the photo honestly and read naturally: no keyword lists, no "image of". A slot that still holds
 * placeholder art has no description, so it is decorative and gets an empty alt.
 */
export type MediaSlot = { w: number; h: number; hue: number; query: string; file: string; topic: string };

const landscape = (hue: number, file: string, query: string, topic: string): MediaSlot => ({ w: 1600, h: 1067, hue, query, file, topic });
const portrait = (hue: number, file: string, query: string, topic: string): MediaSlot => ({ w: 1100, h: 1400, hue, query, file, topic });
const wide = (hue: number, file: string, query: string, topic: string): MediaSlot => ({ w: 2000, h: 900, hue, query, file, topic });

export const media = {
  // Hero and brand
  "lab-bench": portrait(208, "gloved-hands-pipette-laboratory-bench", "scientist gloves pipette laboratory bench", "illustrating batch testing and COA verification for research-use-only peptides"),
  "vials-macro": landscape(200, "gloved-hand-holding-laboratory-sample-vial", "glass vials laboratory macro close up", "representing RUO peptide vials, batch records and certificates of analysis"),
  "lab-wide": wide(212, "laboratory-glass-tubes-close-up", "modern laboratory interior bright", "representing research-use-only peptide laboratory supply and testing"),
  // The four layers
  "layer-build": landscape(214, "laptop-code-screen-website-development", "developer laptop code workspace", "representing custom e-commerce website development for peptide businesses"),
  "layer-run": landscape(196, "packing-parcel-order-fulfillment", "warehouse packing parcels shipping boxes", "representing order fulfillment and shipping operations for peptide stores"),
  "layer-grow": landscape(222, "laptop-analytics-dashboard-growth-reporting", "analytics dashboard laptop growth chart", "representing SEO, email and advertising growth reporting"),
  "layer-verify": landscape(204, "laboratory-microscope-objective-lenses", "laboratory analysis chromatography instrument", "representing supplier verification and compliance-oriented review"),
  // Services
  payments: landscape(218, "card-tap-payment-terminal", "payment terminal credit card checkout", "representing high-risk payment processing for peptide and telehealth merchants"),
  fulfillment: landscape(192, "warehouse-aisle-shelving-pallets", "fulfillment center shelves parcels conveyor", "representing US fulfillment, inventory and 3PL logistics"),
  support: landscape(210, "customer-support-desk-headset", "customer support team headset desk", "representing helpdesk and customer support workflows for online stores"),
  dashboards: landscape(226, "business-dashboard-growth-chart-desktop", "business dashboard monitors office", "representing business dashboards and operations reporting"),
  search: landscape(216, "magnifying-glass-newsprint-search", "search analytics laptop desk notebook", "representing search engine optimization and visibility in AI answers"),
  supplier: landscape(198, "researcher-loading-sample-tubes-laboratory", "quality inspection documents checklist laboratory", "representing peptide supplier sourcing and COA verification"),
  compliance: landscape(206, "pen-on-document-compliance-review", "reviewing documents desk pen paperwork", "representing compliance-oriented review of site content and records"),
  email: landscape(220, "laptop-notebook-cafe-table", "email marketing laptop coffee desk", "representing email marketing and customer retention"),
  affiliate: landscape(194, "handshake-partnership-white-table", "partnership handshake business meeting", "representing affiliate and referral partnerships"),
  meta: landscape(224, "hand-holding-smartphone", "smartphone social media marketing", "representing Meta advertising infrastructure and campaign tracking"),
  audit: landscape(202, "printed-audit-checklist", "website audit checklist screen laptop", "representing a written website and compliance audit"),
  website: landscape(212, "website-wireframe-sketch-notebook", "ecommerce website design workspace", "representing e-commerce website design and catalog architecture"),
  packaging: landscape(190, "boxing-order-clipboard-packaging", "minimal product packaging boxes studio", "representing product packaging and order preparation"),
  // Telehealth
  "telehealth-consult": landscape(196, "stethoscope-laptop-telehealth", "telemedicine video consultation laptop", "representing telehealth platform development for licensed clinical businesses"),
  "telehealth-dashboard": landscape(214, "stethoscope-smartphone-telehealth-platform", "healthcare software tablet clinician", "representing patient portals and secure messaging in a telehealth platform"),
  // About and process
  team: landscape(208, "laptops-notes-planning-desk", "team strategy meeting whiteboard office", "representing planning one connected system instead of juggling separate vendors"),
  process: landscape(216, "handwritten-notes-planning-coffee", "planning workspace notebook desk", "representing the discovery and planning stage of a project"),
} satisfies Record<string, MediaSlot>;

export type MediaKey = keyof typeof media;
