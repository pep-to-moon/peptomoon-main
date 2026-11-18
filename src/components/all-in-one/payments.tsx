import { ButtonLink } from "@/components/ui/button";
import { Reveal, Section } from "@/components/ui/section";
import { ThreadsBg } from "@/components/motion/threads-bg";
import { paymentCompare, paymentIncluded, paymentStats, paymentsOfferQualifier, verticals } from "@/content/all-in-one";
import { AioHead } from "./heading";
import { CountUp } from "./count-up";

/** An illustrative settlement receipt. The asterisks point at the fine print printed under the section. */
function SettlementCard() {
  const orders = [
    ["Order A", "$128.00"],
    ["Order B", "$64.50"],
    ["Order C", "$212.00"],
  ];
  return (
    <figure
      aria-label="Illustrative settlement card showing processing from 3% and a rolling reserve of zero for qualifying merchants"
      className="rounded-[1.5rem] bg-canvas p-6 text-ink sm:p-8"
    >
      <figcaption className="flex items-baseline justify-between gap-3">
        <span className="font-display text-[0.95rem] font-bold uppercase tracking-[0.05em]">Today&apos;s settlement</span>
        <span className="label text-ink-soft">Illustrative</span>
      </figcaption>
      <ul className="mt-5 divide-y divide-line border-y border-line">
        {orders.map(([o, a]) => (
          <li key={o} className="flex justify-between py-3">
            <span className="text-ink-soft">{o}</span>
            <span className="font-semibold tabular-nums">{a}</span>
          </li>
        ))}
      </ul>
      <dl className="mt-5 grid gap-3">
        <div className="flex justify-between">
          <dt className="text-ink-soft">Processing rate</dt>
          <dd className="font-semibold">from 3%*</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-ink-soft">Rolling reserve</dt>
          <dd className="font-semibold tabular-nums">$0.00*</dd>
        </div>
      </dl>
      <div className="mt-7">
        <div className="flex items-center justify-between rounded-xl bg-blue px-4 py-3 font-display text-[0.8rem] font-bold uppercase tracking-[0.05em] text-white">
          <span>Paid to your bank</span>
          <span aria-hidden>100%</span>
        </div>
        <div aria-hidden className="mt-4 flex h-2 overflow-hidden rounded-full bg-ink/10">
          <span className="w-[85%] bg-ink/25" />
          <span className="w-[15%] bg-[repeating-linear-gradient(45deg,rgba(11,22,35,0.5)_0_3px,transparent_3px_6px)]" />
        </div>
        <p className="mt-2 text-[0.78rem] text-ink-soft">Typical high-risk account: 5 to 15% held for 3 to 6 months</p>
      </div>
      <p className="mt-5 text-[0.72rem] text-ink-soft">Not a real account.</p>
    </figure>
  );
}

export function PaymentsSection() {
  return (
    <Section id="payments" tone="navy" panel labelledBy="aio-payments" className="scroll-mt-24 py-[clamp(3.5rem,6.5vw,6rem)]">
      <ThreadsBg
        color={[0.6, 0.84, 0.92]}
        accentColor={[0.18, 0.37, 0.54]}
        amplitude={1.25}
        distance={0.5}
        lineCount={64}
        thickness={0.55}
        speed={0.35}
        opacity={0.5}
        fade={0.25}
        heightClass="h-[760px]"
      />
      <div className="container-x relative">
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <AioHead
              dark
              id="aio-payments"
              label="Run · High-risk payment processing"
              title="High-risk payment processing from 3%, with no rolling reserve"
            />
            <Reveal delay={1}>
              <p className="mt-6 max-w-[62ch] text-[1.0625rem] leading-relaxed text-white/80">
                Peptide, RUO and telehealth businesses are routinely declined, frozen or shut down by mainstream payment platforms. We set up high-risk
                merchant accounts through acquiring partners who underwrite your category on purpose. For qualifying merchants, that means processing
                from 3% and no rolling reserve. Your revenue reaches your bank instead of sitting in a reserve for months.
              </p>
              <ul aria-label="Verticals we support" className="label mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sky">
                {verticals.map((v, i) => (
                  <li key={v} className="flex items-center gap-5">
                    {i > 0 && <span aria-hidden className="size-1 rounded-full bg-sky/60" />}
                    {v}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <Reveal delay={1} className="lg:col-span-5">
            <SettlementCard />
          </Reveal>
        </div>

        <dl className="mt-16 grid gap-10 border-t border-white/20 pt-10 md:grid-cols-3 md:gap-0">
          {paymentStats.map((s, i) => {
            const n = Number.parseInt(s.num, 10);
            const suffix = s.num.replace(String(n), "");
            return (
              <Reveal key={s.label} delay={i} className={i > 0 ? "md:border-l md:border-white/20 md:pl-10" : "md:pr-10"}>
                <dt className="label text-sky">{s.label}</dt>
                <dd>
                  <span className="mt-4 block font-display text-[clamp(3.5rem,2rem+5vw,6rem)] font-bold leading-none tracking-[-0.03em]">
                    <CountUp value={n} suffix={suffix} />
                    {s.star && <sup className="ml-1 align-super text-[0.4em] text-sky">*</sup>}
                  </span>
                  <span className="mt-4 block max-w-[34ch] text-white/75">{s.text}</span>
                </dd>
              </Reveal>
            );
          })}
        </dl>

        <Reveal className="mt-20">
          <h3 className="display-sentence text-[clamp(1.6rem,1rem+1.8vw,2.4rem)]">How it compares</h3>
          <div className="mt-8">
            <table role="table" className="w-full border-collapse text-left max-sm:block">
              <caption className="sr-only">Typical high-risk account compared with processing arranged through Peptomoon</caption>
              <thead role="rowgroup" className="max-sm:sr-only">
                <tr role="row" className="label border-b border-white/30 text-sky">
                  <th role="columnheader" scope="col" className="py-3 pr-4 font-semibold">
                    <span className="sr-only">Item</span>
                  </th>
                  <th role="columnheader" scope="col" className="px-4 py-3 font-semibold">
                    Typical high-risk account
                  </th>
                  <th role="columnheader" scope="col" className="bg-white/[0.07] px-4 py-3 font-semibold text-white">
                    Arranged through Peptomoon*
                  </th>
                </tr>
              </thead>
              <tbody role="rowgroup" className="max-sm:block">
                {paymentCompare.map(([k, typical, ours]) => (
                  <tr role="row" key={k} className="border-b border-white/15 align-top max-sm:block max-sm:py-5">
                    <th role="rowheader" scope="row" className="py-4 pr-4 font-medium text-white/70 max-sm:block max-sm:pb-3 max-sm:pt-0 max-sm:font-semibold max-sm:text-white">
                      {k}
                    </th>
                    <td
                      role="cell"
                      data-label="Typical"
                      className="px-4 py-4 text-white/70 max-sm:block max-sm:px-0 max-sm:py-1 max-sm:before:mb-0.5 max-sm:before:block max-sm:before:text-[0.68rem] max-sm:before:font-semibold max-sm:before:uppercase max-sm:before:tracking-[0.1em] max-sm:before:text-sky max-sm:before:content-[attr(data-label)]"
                    >
                      {typical}
                    </td>
                    <td
                      role="cell"
                      data-label="Peptomoon*"
                      className="bg-white/[0.07] px-4 py-4 font-semibold max-sm:mt-1 max-sm:block max-sm:rounded-lg max-sm:px-3 max-sm:py-2 max-sm:before:mb-0.5 max-sm:before:block max-sm:before:text-[0.68rem] max-sm:before:font-semibold max-sm:before:uppercase max-sm:before:tracking-[0.1em] max-sm:before:text-sky max-sm:before:content-[attr(data-label)]"
                    >
                      {ours}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        <div className="mt-20">
          <Reveal>
            <h3 className="display-sentence text-[clamp(1.6rem,1rem+1.8vw,2.4rem)]">What is included</h3>
          </Reveal>
          <ol className="mt-8 grid gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
            {paymentIncluded.map((item, i) => (
              <Reveal as="li" delay={i % 3} key={item} className="flex gap-4 border-t border-white/20 py-4">
                <span aria-hidden className="w-6 shrink-0 font-display text-[0.8rem] font-semibold tabular-nums text-sky">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{item}</span>
              </Reveal>
            ))}
          </ol>
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href="/contact?topic=payments" variant="light" size="lg">
              Check your eligibility
            </ButtonLink>
            <ButtonLink href="/services/payment-processing" variant="onDark" size="lg">
              Payment processing details
            </ButtonLink>
          </div>
        </div>

        <p className="mt-12 max-w-[90ch] text-[0.82rem] leading-relaxed text-white/75">{paymentsOfferQualifier}</p>
      </div>
    </Section>
  );
}
