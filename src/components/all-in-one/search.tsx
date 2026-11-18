import { Reveal } from "@/components/ui/section";
import { addOns, programs, searchTicks } from "@/content/all-in-one";

const surfaces: [string, string, string][] = [
  ["SEO", "Rank", "Rankings in Google and Bing"],
  ["GEO", "Be cited", "Citations in ChatGPT, Perplexity and AI Overviews"],
  ["AEO", "Be the answer", "Direct answers for search and voice assistants"],
];

/** Three ways a brand is found, as a typographic stack, beside the technical foundation that carries all three. */
export function SearchFoundation() {
  return (
    <div className="mt-14 grid gap-14 lg:grid-cols-12 lg:gap-16">
      <ul className="lg:col-span-7">
        {surfaces.map(([k, verb, d], i) => (
          <Reveal as="li" delay={i} key={k} className="grid grid-cols-[minmax(5.5rem,auto)_1fr] items-baseline gap-x-6 border-t border-ink/20 py-6 last:border-b">
            <span className="font-display text-[clamp(2.4rem,1.2rem+3.4vw,4.4rem)] font-bold leading-none tracking-[-0.03em] text-blue">{k}</span>
            <span>
              <span className="label block text-ink-soft">{verb}</span>
              <span className="mt-1 block font-display text-[1.2rem] font-bold leading-snug">{d}</span>
            </span>
          </Reveal>
        ))}
      </ul>
      <Reveal delay={1} className="lg:col-span-5">
        <h3 className="label text-ink-soft">The foundation under all three</h3>
        <ul className="mt-4">
          {searchTicks.map((t) => (
            <li key={t} className="border-t border-ink/20 py-3.5 last:border-b">
              {t}
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  );
}

/** Monthly programs as three ruled columns that gain weight left to right. */
export function Programs() {
  return (
    <div className="mt-16">
      <h3 className="label text-ink-soft">Monthly growth programs</h3>
      <ol className="mt-4 grid gap-x-12 border-t border-ink/30 lg:grid-cols-3">
        {programs.map(([name, what], i) => (
          <Reveal as="li" delay={i} key={name} className="border-b border-ink/20 py-7 lg:border-b-0">
            <span className="font-display text-[0.85rem] font-semibold tabular-nums text-blue">{String(i + 1).padStart(2, "0")}</span>
            <h4 className="display-sentence mt-2 text-[1.7rem]">{name}</h4>
            <p className="mt-3 max-w-[40ch] text-ink-soft">{what}</p>
          </Reveal>
        ))}
      </ol>
      <p className="mt-2 text-[0.9rem] text-ink-soft">We do not guarantee rankings or AI citations. We report what changed and why.</p>
    </div>
  );
}

/** Four optional extras in a two-by-two ruled grid. */
export function AddOns() {
  return (
    <ul className="mt-14 grid gap-x-16 md:grid-cols-2">
      {addOns.map((a, i) => (
        <Reveal as="li" delay={i % 2} key={a.t} className="border-t border-ink/25 py-8">
          <span className="label text-blue">{a.n}</span>
          <h3 className="display-sentence mt-2 text-[clamp(1.6rem,1.1rem+1.4vw,2.3rem)]">{a.t}</h3>
          <p className="mt-3 max-w-[46ch] text-ink-soft">{a.d}</p>
        </Reveal>
      ))}
    </ul>
  );
}
