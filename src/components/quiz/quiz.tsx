"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  inquirySchema,
  SERVICE_VALUES,
  serviceLabels,
  serviceSlugToOption,
  STATUS_VALUES,
  statusLabels,
  type InquiryValues,
  type ServiceValue,
  type StatusValue,
} from "@/lib/inquiry-schema";

/** Two short steps. Only the services, a name, an email and consent are required. Everything else is optional. */
type StepKey = "needs" | "contact";
const steps: StepKey[] = ["needs", "contact"];

const stepMeta: Record<StepKey, { label: string; title: string }> = {
  needs: { label: "What you need", title: "What do you need help with?" },
  contact: { label: "Where to reply", title: "Where should we reply?" },
};

type Submit =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent"; email: string }
  | { kind: "error"; message: string };

const inputClass =
  "mt-2 block min-h-12 w-full rounded-2xl border border-ink/15 bg-white px-4 py-3 text-base transition-colors placeholder:text-ink-soft/60 hover:border-ink/30 focus:border-blue aria-[invalid=true]:border-2 aria-[invalid=true]:border-blue-deep";

function Field({
  label,
  error,
  hint,
  id,
  optional,
  children,
}: {
  label: string;
  error?: string;
  hint?: string;
  id: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="font-display font-bold">
        {label}
        {optional && <span className="ml-2 text-[0.8rem] font-medium text-ink-soft">Optional</span>}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="mt-1 text-[0.9rem] text-ink-soft">
          {hint}
        </p>
      )}
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-2 flex items-start gap-2 text-[0.95rem] font-semibold text-blue-deep">
                    {error}
        </p>
      )}
    </div>
  );
}

const chipBase =
  "flex min-h-14 items-center gap-3 rounded-2xl bg-white px-4 py-3 font-semibold ring-1 ring-ink/15 transition-all peer-checked:bg-blue peer-checked:text-white peer-checked:ring-blue peer-focus-visible:outline-[3px] peer-focus-visible:outline-offset-[3px] peer-focus-visible:outline-blue hover:ring-blue/50";

export function Quiz({ fallbackEmail }: { fallbackEmail: string }) {
  const params = useSearchParams();
  const base = useId();

  const initial = useMemo(() => {
    const s = params.get("status");
    const svc = params.get("service");
    const status = (STATUS_VALUES as readonly string[]).includes(s ?? "") ? (s as StatusValue) : undefined;
    const option = svc ? serviceSlugToOption[svc] : undefined;
    return { status, services: option ? [option] : [] };
  }, [params]);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    trigger,
    setError,
    formState: { errors },
  } = useForm<InquiryValues>({
    resolver: zodResolver(inquirySchema),
    mode: "onTouched",
    defaultValues: {
      status: initial.status,
      services: initial.services,
      websiteUrl: "",
      requirements: "",
      challenges: "",
      name: "",
      business: "",
      email: "",
      phone: "",
      consent: false,
    },
  });

  const status = useWatch({ control, name: "status" });
  const services = useWatch({ control, name: "services" }) ?? [];

  const [stepKey, setStepKey] = useState<StepKey>("needs");
  const index = steps.indexOf(stepKey);
  const meta = stepMeta[stepKey];

  const [submit, setSubmit] = useState<Submit>({ kind: "idle" });
  const [stepError, setStepError] = useState<string | null>(null);
  const [moreOpen, setMoreOpen] = useState(false);
  // The quick check: a simple arithmetic question issued and verified by this site's own server.
  const [challenge, setChallenge] = useState<{ question: string; token: string } | null>(null);
  const [challengeFailed, setChallengeFailed] = useState(false);
  const [answer, setAnswer] = useState("");
  const [answerError, setAnswerError] = useState("");
  const loadChallenge = useCallback(() => {
    fetch("/api/challenge", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error("challenge"))))
      .then((c: { question: string; token: string }) => setChallenge(c))
      .catch(() => setChallengeFailed(true));
  }, []);
  useEffect(() => {
    loadChallenge();
  }, [loadChallenge]);
  const retryChallenge = () => {
    setChallengeFailed(false);
    loadChallenge();
  };
  const [honeypot, setHoneypot] = useState("");
  const startedAt = useRef(0);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const alertRef = useRef<HTMLParagraphElement>(null);
  const mounted = useRef(false);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  useEffect(() => {
    if (mounted.current) headingRef.current?.focus();
    mounted.current = true;
  }, [stepKey]);

  useEffect(() => {
    if (stepError) alertRef.current?.focus();
  }, [stepError]);

  // Open the optional details if one of them needs attention, so an error is never hidden.
  const optionalHasError = Boolean(errors.websiteUrl || errors.requirements || errors.business);


  const toggleService = (value: ServiceValue) => {
    let next: ServiceValue[];
    if (value === "complete-infrastructure") {
      next = services.includes(value) ? [] : [value];
    } else {
      const without = services.filter((s) => s !== "complete-infrastructure");
      next = without.includes(value) ? without.filter((s) => s !== value) : [...without, value];
    }
    setValue("services", next, { shouldValidate: true, shouldDirty: true });
    setStepError(null);
  };

  const next = async () => {
    setStepError(null);
    const ok = await trigger("services");
    if (!ok) {
      setStepError("Choose at least one service to continue.");
      return;
    }
    setStepKey("contact");
  };

  const back = () => {
    setStepError(null);
    setStepKey("needs");
  };

  const onSubmit = async (values: InquiryValues) => {
    if (!answer.trim()) {
      setAnswerError("Answer the quick check to send your enquiry.");
      return;
    }
    setAnswerError("");
    setSubmit({ kind: "sending" });
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...values, company_website: honeypot, startedAt: startedAt.current, captchaToken: challenge?.token ?? "", captchaAnswer: answer }),
      });
      const data = (await res.json().catch(() => null)) as { ok?: boolean; error?: string; fieldErrors?: Record<string, string[]> } | null;

      if (res.status === 202 && data?.ok === true) {
        setSubmit({ kind: "sent", email: values.email });
        return;
      }
      if (res.status === 400 && data?.fieldErrors) {
        for (const [field, messages] of Object.entries(data.fieldErrors)) {
          if (messages?.[0]) setError(field as keyof InquiryValues, { message: messages[0] });
        }
        setSubmit({ kind: "error", message: "Some answers need another look. Please check the highlighted fields." });
        return;
      }
      if (res.status === 429) {
        setSubmit({ kind: "error", message: "Too many attempts from this connection. Please wait a few minutes and try again." });
        return;
      }
      if (data?.error === "captcha_failed") {
        setSubmit({ kind: "error", message: "The quick check answer was not right, or it timed out. Please answer the new question and send again." });
        setAnswer("");
        setChallenge(null);
        loadChallenge();
        return;
      }
      setSubmit({ kind: "error", message: "We could not send your enquiry, so nothing was submitted." });
    } catch {
      setSubmit({ kind: "error", message: "We could not reach the server, so nothing was submitted." });
    }
  };

  if (submit.kind === "sent") {
    return (
      <div role="status" className="rounded-[1.25rem] bg-sky-soft p-8 ring-1 ring-blue/20 sm:p-12">
        <Check aria-hidden className="size-9 text-blue" />
        <h2 className="display display-md mt-6">Thank you. We have your enquiry.</h2>
        <p className="mt-5 max-w-[52ch] text-ink-soft">
          We read every answer and will reply to <strong className="text-ink">{submit.email}</strong>. If something looks wrong in
          what you sent, just reply to our message.
        </p>
      </div>
    );
  }

  // MotionConfig below disables the horizontal movement for people who prefer reduced motion.
  const motionProps = {
    initial: { opacity: 0, x: 24 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -24 },
    transition: { duration: 0.26, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  };

  const lastStep = index === steps.length - 1;

  return (
    <MotionConfig reducedMotion="user">
      <form
        onSubmit={(e) => void handleSubmit(onSubmit)(e)}
        noValidate
        aria-labelledby={`${base}-form-title`}
        className="rounded-[1.25rem] bg-white p-5 ring-1 ring-ink/15 sm:p-9"
      >
        <p id={`${base}-form-title`} className="sr-only">
          Project questionnaire
        </p>

        <nav aria-label="Progress">
          <p className="label">
            Step {index + 1} of {steps.length}: {meta.label}
          </p>
          <ol className="mt-4 flex gap-2">
            {steps.map((s, i) => (
              <li
                key={s}
                aria-current={i === index ? "step" : undefined}
                className={cn("h-1.5 flex-1 rounded-full transition-colors", i <= index ? "bg-blue" : "bg-line")}
              >
                <span className="sr-only">
                  {stepMeta[s].label}
                  {i < index ? ", done" : i === index ? ", current" : ""}
                </span>
              </li>
            ))}
          </ol>
        </nav>

        <div className="mt-8 min-h-[22rem]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={stepKey} {...motionProps}>
              <h2 ref={headingRef} tabIndex={-1} className="display display-md outline-none">
                {meta.title}
              </h2>

              {stepError && (
                <p ref={alertRef} tabIndex={-1} role="alert" className="mt-5 rounded-2xl bg-sky-soft px-4 py-3 font-semibold text-blue-deep outline-none ring-1 ring-blue/30">
                  {stepError}
                </p>
              )}

              {stepKey === "needs" && (
                <div className="mt-7">
                  <fieldset>
                    <legend className="text-ink-soft">Select all that apply.</legend>
                    <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
                      {SERVICE_VALUES.map((v) => {
                        const on = services.includes(v);
                        return (
                          <label key={v} className={cn("block cursor-pointer", v === "complete-infrastructure" && "sm:col-span-2")}>
                            <input type="checkbox" checked={on} onChange={() => toggleService(v)} className="peer sr-only" />
                            <span className={chipBase}>
                              <span aria-hidden className={cn("grid size-5 shrink-0 place-items-center rounded-[0.3rem] ring-1 ring-current/50", on && "bg-white text-blue ring-white")}>
                                {on && <Check className="size-3.5" />}
                              </span>
                              {serviceLabels[v]}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                    {services.includes("complete-infrastructure") && (
                      <p className="mt-4 text-[0.95rem] text-ink-soft">Complete infrastructure covers every service, so the others are cleared.</p>
                    )}
                  </fieldset>

                  <fieldset className="mt-9">
                    <legend className="font-display font-bold">
                      Where are you today?<span className="ml-2 text-[0.8rem] font-medium text-ink-soft">Optional</span>
                    </legend>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {STATUS_VALUES.map((v) => (
                        <label key={v} className="cursor-pointer">
                          <input
                            type="radio"
                            name="status"
                            value={v}
                            checked={status === v}
                            onChange={() => setValue("status", v, { shouldDirty: true })}
                            onClick={() => {
                              // Clicking the chosen option again clears it, since the question is optional.
                              if (status === v) setValue("status", undefined, { shouldDirty: true });
                            }}
                            className="peer sr-only"
                          />
                          <span className="inline-flex min-h-11 items-center rounded-full bg-white px-4 text-[0.92rem] font-semibold ring-1 ring-ink/15 transition-all peer-checked:bg-blue peer-checked:text-white peer-checked:ring-blue peer-focus-visible:outline-[3px] peer-focus-visible:outline-offset-[3px] peer-focus-visible:outline-blue hover:ring-blue/50">
                            {statusLabels[v]}
                          </span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                </div>
              )}

              {stepKey === "contact" && (
                <div className="mt-7 space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <Field id={`${base}-name`} label="Your name" error={errors.name?.message}>
                      <input id={`${base}-name`} type="text" autoComplete="name" aria-invalid={errors.name ? true : undefined} aria-describedby={errors.name ? `${base}-name-error` : undefined} className={inputClass} {...register("name")} />
                    </Field>
                    <Field id={`${base}-email`} label="Email" error={errors.email?.message}>
                      <input id={`${base}-email`} type="email" autoComplete="email" inputMode="email" aria-invalid={errors.email ? true : undefined} aria-describedby={errors.email ? `${base}-email-error` : undefined} className={inputClass} {...register("email")} />
                    </Field>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <Field id={`${base}-phone`} label="Phone number" optional hint="With country code, if you would like a call." error={errors.phone?.message}>
                      <input
                        id={`${base}-phone`}
                        type="tel"
                        autoComplete="tel"
                        inputMode="tel"
                        aria-invalid={errors.phone ? true : undefined}
                        aria-describedby={`${base}-phone-hint${errors.phone ? ` ${base}-phone-error` : ""}`}
                        className={inputClass}
                        {...register("phone")}
                      />
                    </Field>
                  </div>

                  <details
                    open={moreOpen || optionalHasError}
                    onToggle={(e) => setMoreOpen((e.currentTarget as HTMLDetailsElement).open)}
                    className="group rounded-2xl bg-sky-soft/70 ring-1 ring-ink/10"
                  >
                    <summary className="flex min-h-14 cursor-pointer items-center justify-between gap-4 px-5 font-display font-bold">
                      <span>
                        Add more detail<span className="ml-2 text-[0.8rem] font-medium text-ink-soft">Optional</span>
                      </span>
                      <span aria-hidden className="text-xl leading-none transition-transform group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    <div className="grid gap-6 px-5 pb-6 pt-1 sm:grid-cols-2">
                      <Field id={`${base}-biz`} label="Business name" optional error={errors.business?.message}>
                        <input id={`${base}-biz`} type="text" autoComplete="organization" aria-invalid={errors.business ? true : undefined} aria-describedby={errors.business ? `${base}-biz-error` : undefined} className={inputClass} {...register("business")} />
                      </Field>
                      <div>
                        <Field id={`${base}-url`} label="Website address" optional hint="If you have one, we will take a look before we reply." error={errors.websiteUrl?.message}>
                          <input
                            id={`${base}-url`}
                            type="text"
                            inputMode="url"
                            autoComplete="url"
                            placeholder="example.com"
                            aria-invalid={errors.websiteUrl ? true : undefined}
                            aria-describedby={`${base}-url-hint${errors.websiteUrl ? ` ${base}-url-error` : ""}`}
                            className={inputClass}
                            {...register("websiteUrl")}
                          />
                        </Field>
                      </div>
                      <div className="sm:col-span-2">
                        <Field id={`${base}-req`} label="Anything we should know?" optional error={errors.requirements?.message}>
                          <textarea
                            id={`${base}-req`}
                            rows={4}
                            aria-invalid={errors.requirements ? true : undefined}
                            aria-describedby={errors.requirements ? `${base}-req-error` : undefined}
                            className={inputClass}
                            {...register("requirements")}
                          />
                        </Field>
                      </div>
                    </div>
                  </details>

                  <div>
                    <label className="flex cursor-pointer items-start gap-3">
                      <input
                        type="checkbox"
                        aria-invalid={errors.consent ? true : undefined}
                        aria-describedby={errors.consent ? `${base}-consent-error` : undefined}
                        className="mt-1 size-5 shrink-0 accent-[#2f5f8a]"
                        {...register("consent")}
                      />
                      <span className="text-[0.95rem]">
                        I agree that you may contact me about this enquiry, and I have read the{" "}
                        <Link href="/privacy-policy" target="_blank" className="text-blue underline underline-offset-4">
                          Privacy Policy
                        </Link>
                        .
                      </span>
                    </label>
                    {errors.consent && (
                      <p id={`${base}-consent-error`} className="mt-2 flex items-start gap-2 text-[0.95rem] font-semibold text-blue-deep">
                                                {errors.consent.message}
                      </p>
                    )}
                  </div>

                  {/* Honeypot: invisible to people, tempting to bots. */}
                  <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                    <label>
                      Company website
                      <input type="text" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
                    </label>
                  </div>

                  <Field
                    id={`${base}-check`}
                    label={challenge ? `Quick check: ${challenge.question}` : "Quick check"}
                    hint="A simple sum that keeps automated spam out."
                    error={answerError}
                  >
                    {challenge ? (
                      <input
                        id={`${base}-check`}
                        type="text"
                        inputMode="numeric"
                        autoComplete="off"
                        value={answer}
                        onChange={(e) => {
                          setAnswer(e.target.value);
                          if (answerError) setAnswerError("");
                        }}
                        aria-invalid={answerError ? true : undefined}
                        aria-describedby={`${base}-check-hint${answerError ? ` ${base}-check-error` : ""}`}
                        className={cn(inputClass, "max-w-40")}
                      />
                    ) : challengeFailed ? (
                      <p className="mt-3 text-[0.95rem]">
                        We could not load the quick check.{" "}
                        <button type="button" onClick={retryChallenge} className="font-semibold text-blue underline underline-offset-4">
                          Try again
                        </button>
                      </p>
                    ) : (
                      <p className="mt-3 text-[0.95rem] text-ink-soft">Loading the quick check.</p>
                    )}
                  </Field>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div aria-live="polite" className="mt-2">
          {submit.kind === "error" && (
            <div role="alert" className="mb-6 rounded-2xl bg-sky-soft p-4 ring-1 ring-blue/30">
              <p className="font-semibold text-blue-deep">{submit.message}</p>
              {fallbackEmail && (
                <p className="mt-1 text-[0.95rem]">
                  Your answers are still here. Try again, or email us at{" "}
                  <a href={`mailto:${fallbackEmail}`} className="font-semibold text-blue underline underline-offset-4">
                    {fallbackEmail}
                  </a>
                  .
                </p>
              )}
              {!fallbackEmail && <p className="mt-1 text-[0.95rem]">Your answers are still here. Please try again in a moment.</p>}
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
          <Button type="button" variant="secondary" onClick={back} disabled={index === 0 || submit.kind === "sending"} className={cn(index === 0 && "invisible")}>
            <span className="flex items-center gap-2">
              <ArrowLeft aria-hidden className="size-4" /> Back
            </span>
          </Button>
          {lastStep ? (
            <Button type="submit" size="lg" disabled={submit.kind === "sending" || !challenge} arrow>
              {submit.kind === "sending" ? "Sending" : "Send enquiry"}
            </Button>
          ) : (
            <Button type="button" size="lg" onClick={next} arrow>
              Continue
            </Button>
          )}
        </div>
      </form>
    </MotionConfig>
  );
}
