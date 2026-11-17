import { TextLink } from "@/components/ui/button";
import { Reveal, Section, SectionIntro } from "@/components/ui/section";

const events = ["ViewContent", "AddToCart", "InitiateCheckout", "Purchase"];

/** Three flat columns split by hairlines. Content carries the section, not boxes around it. */
export function Growth() {
  return (
    <Section labelledBy="growth-title">
      <div className="container-x">
        <SectionIntro label="Grow the audience" titleId="growth-title" title={<>Growth is infrastructure first, promises never.</>}>
          <p>
            Tracking, affiliates and email all depend on the same foundation: accurate events tied to real orders. We build
            that foundation, and we are honest about what is not ours to control.
          </p>
        </SectionIntro>

        <div className="grid gap-x-12 gap-y-14 lg:grid-cols-3">
          <Reveal className="flex flex-col border-t border-ink/20 pt-6">
            <p className="label text-ink-soft">Measurement</p>
            <h3 className="heading-sm mt-3">One event list, sent twice, counted once.</h3>
            <ul className="mt-6 divide-y divide-line border-y border-line">
              {events.map((e) => (
                <li key={e} className="flex items-center justify-between gap-3 py-3">
                  <span className="text-[0.95rem] font-semibold">{e}</span>
                  <span className="label text-ink-soft">Browser + server</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[0.92rem] text-ink-soft">Deduplicated by event ID and sent only with consent.</p>
            <div className="mt-auto pt-6">
              <TextLink href="/services/meta-advertising">Meta advertising infrastructure</TextLink>
            </div>
          </Reveal>

          <Reveal delay={1} className="flex flex-col border-t border-ink/20 pt-6">
            <p className="label text-ink-soft">Affiliates</p>
            <h3 className="heading-sm mt-3">Attribution stored on the order.</h3>
            <ol className="mt-6 divide-y divide-line border-y border-line">
              {["Referral link", "Attribution on the order", "Net sale", "Commission", "Payout record"].map((s, i) => (
                <li key={s} className="flex items-baseline gap-5 py-3">
                  <span aria-hidden className="w-5 font-display text-[0.85rem] font-semibold text-ink-soft">
                    {i + 1}
                  </span>
                  <span className="text-[0.95rem] font-semibold">{s}</span>
                </li>
              ))}
            </ol>
            <p className="mt-4 text-[0.92rem] text-ink-soft">Refunds and chargebacks reverse commissions by rule.</p>
            <div className="mt-auto pt-6">
              <TextLink href="/services/affiliate-management">Affiliate infrastructure</TextLink>
            </div>
          </Reveal>

          <Reveal delay={2} className="flex flex-col border-t border-ink/20 pt-6">
            <p className="label text-ink-soft">Email</p>
            <h3 className="heading-sm mt-3">Authenticated first, then automated.</h3>
            <dl className="mt-6 divide-y divide-line border-y border-line text-[0.95rem]">
              <div className="flex items-center justify-between gap-3 py-3">
                <dt className="font-semibold">Authentication</dt>
                <dd className="text-ink-soft">SPF, DKIM, DMARC</dd>
              </div>
              <div className="flex items-center justify-between gap-3 py-3">
                <dt className="font-semibold">Stream one</dt>
                <dd className="text-ink-soft">Transactional</dd>
              </div>
              <div className="flex items-center justify-between gap-3 py-3">
                <dt className="font-semibold">Stream two</dt>
                <dd className="text-ink-soft">Marketing</dd>
              </div>
            </dl>
            <p className="mt-4 text-[0.92rem] text-ink-soft">Consent recorded, suppression honoured, no inbox promises.</p>
            <div className="mt-auto pt-6">
              <TextLink href="/services/email-marketing">Email marketing and retention</TextLink>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
