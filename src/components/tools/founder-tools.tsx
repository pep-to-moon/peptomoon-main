"use client";

import { useId, useMemo, useState } from "react";

/* Three founder tools. Everything runs in the browser, nothing is sent or stored,
   and no figure on this page is a benchmark: the budget uses only numbers you type. */

const budgetLines = [
  ["Business set-up", "Entity, banking, insurance and advice from counsel"],
  ["Stock", "The first order, and the cash it ties up"],
  ["Testing", "Independent sample testing and document review"],
  ["Labels and packaging", "Design, printing, vials and shipping materials"],
  ["Store", "Build or subscription, domain, apps and plugins"],
  ["Payments", "Set-up, fees and any reserve you cannot use"],
  ["Fulfillment", "Storage, packing, postage and returns"],
  ["Support and tools", "Help desk, email and analytics"],
  ["Marketing", "Search, email and partner programs"],
  ["Buffer", "Money for the delays you have not planned for"],
] as const;

const scoreLines = [
  ["Identity", "Legal name, address, contact and history all agree"],
  ["Batch documents", "Named laboratory, method, data and a matching batch number"],
  ["Laboratory", "Independent, confirmable and accredited for the relevant tests"],
  ["Sample testing", "Allowed, and results agree with the report"],
  ["Terms", "Clear, written and fair, including bad-batch handling"],
  ["Responsiveness", "Answers questions fully and in time"],
] as const;

const checklist: { group: string; items: string[] }[] = [
  {
    group: "Business",
    items: ["Entity formed and business bank account open", "Advice taken from qualified counsel on your state and products", "Insurance arranged"],
  },
  {
    group: "Supply",
    items: ["Written supplier standard", "Batch-specific documents for every product you will list", "Report confirmed with the laboratory", "A second supplier qualified"],
  },
  {
    group: "Labels and store",
    items: ["Label wording agrees with your documents", "Research-use notices consistent on every page", "No copy that points toward personal use", "Policies match what you actually do"],
  },
  {
    group: "Payments",
    items: ["Provider terms read for this category", "Application and live site tell the same accurate story", "Plan for a processor shutdown or held funds"],
  },
  {
    group: "Operations and marketing",
    items: ["Fulfillment owner and process written down", "Support replies avoid usage advice", "Tracking checked against real orders", "Plan for channels beyond paid advertising"],
  },
];

const money = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

const fieldClass = "w-full border border-ink/25 bg-transparent px-3 py-2 text-[1rem] focus-visible:outline-2 focus-visible:outline-blue";

export function BudgetTool() {
  const uid = useId();
  const [values, setValues] = useState<Record<string, string>>({});
  const [months, setMonths] = useState("");
  const total = useMemo(() => budgetLines.reduce((sum, [name]) => sum + (Number.parseFloat(values[name] ?? "") || 0), 0), [values]);
  const monthly = Number.parseFloat(months) || 0;
  return (
    <div>
      <div className="grid gap-x-8 gap-y-5 md:grid-cols-2">
        {budgetLines.map(([name, hint], i) => (
          <div key={name}>
            <label htmlFor={`${uid}-${i}`} className="font-display font-bold">
              {name}
            </label>
            <p id={`${uid}-h${i}`} className="text-sm text-ink-soft">
              {hint}
            </p>
            <input
              id={`${uid}-${i}`}
              aria-describedby={`${uid}-h${i}`}
              inputMode="decimal"
              min={0}
              type="number"
              placeholder="Your own figure, in dollars"
              className={`mt-2 ${fieldClass}`}
              value={values[name] ?? ""}
              onChange={(e) => setValues((v) => ({ ...v, [name]: e.target.value }))}
            />
          </div>
        ))}
      </div>
      <div className="mt-8 grid gap-6 border-t border-ink/20 pt-6 md:grid-cols-2">
        <div>
          <label htmlFor={`${uid}-m`} className="font-display font-bold">
            Monthly running cost after launch
          </label>
          <input
            id={`${uid}-m`}
            inputMode="decimal"
            min={0}
            type="number"
            placeholder="Your own figure, in dollars"
            className={`mt-2 ${fieldClass}`}
            value={months}
            onChange={(e) => setMonths(e.target.value)}
          />
        </div>
        <div aria-live="polite">
          <p className="label text-ink-soft">Your total before launch</p>
          <p className="display display-md mt-1">{money(total)}</p>
          <p className="mt-2 text-ink-soft">
            {monthly > 0 ? `Twelve months of running cost adds ${money(monthly * 12)}, so a first-year figure is ${money(total + monthly * 12)}.` : "Add a monthly figure to see a first-year total."}
          </p>
        </div>
      </div>
      <p className="mt-4 text-sm text-ink-soft">The worksheet adds up only the numbers you enter. It does not estimate or suggest any cost.</p>
    </div>
  );
}

const scoreOptions = [
  ["", "Not scored"],
  ["0", "0 - missing"],
  ["1", "1 - partly"],
  ["2", "2 - fully"],
] as const;

export function ScorecardTool() {
  const uid = useId();
  const [names, setNames] = useState(["", "", ""]);
  const [scores, setScores] = useState<string[][]>(() => scoreLines.map(() => ["", "", ""]));
  const totals = names.map((_, c) => scores.reduce((sum, row) => sum + (row[c] === "" ? 0 : Number(row[c])), 0));
  const max = scoreLines.length * 2;
  return (
    <div>
      <div className="overflow-x-auto" tabIndex={0} role="region" aria-label="Supplier scorecard">
        <table className="w-full min-w-[42rem] border-collapse text-left text-[1rem] leading-snug">
          <caption className="sr-only">Score each supplier from 0 to 2 on every line</caption>
          <thead>
            <tr className="border-y border-ink/25">
              <th scope="col" className="label py-3 pr-3">
                Line
              </th>
              {names.map((n, c) => (
                <th key={c} scope="col" className="px-2 py-3">
                  <label htmlFor={`${uid}-n${c}`} className="sr-only">
                    Supplier {c + 1} name
                  </label>
                  <input
                    id={`${uid}-n${c}`}
                    className={fieldClass}
                    placeholder={`Supplier ${c + 1}`}
                    value={n}
                    onChange={(e) => setNames((x) => x.map((v, i) => (i === c ? e.target.value : v)))}
                  />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {scoreLines.map(([line, good], r) => (
              <tr key={line} className="border-b border-ink/15 align-top">
                <th scope="row" className="py-3 pr-3">
                  <span className="font-display font-bold">{line}</span>
                  <span className="mt-1 block text-sm font-normal text-ink-soft">{good}</span>
                </th>
                {names.map((_, c) => (
                  <td key={c} className="px-2 py-3">
                    <label htmlFor={`${uid}-${r}-${c}`} className="sr-only">
                      {line}, supplier {c + 1}
                    </label>
                    <select
                      id={`${uid}-${r}-${c}`}
                      className={fieldClass}
                      value={scores[r][c]}
                      onChange={(e) => setScores((s) => s.map((row, ri) => (ri === r ? row.map((v, ci) => (ci === c ? e.target.value : v)) : row)))}
                    >
                      {scoreOptions.map(([v, l]) => (
                        <option key={v} value={v}>
                          {l}
                        </option>
                      ))}
                    </select>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          <tfoot aria-live="polite">
            <tr className="border-t border-ink/25">
              <th scope="row" className="py-3 pr-3 font-display font-bold">
                Total out of {max}
              </th>
              {totals.map((t, c) => (
                <td key={c} className="px-2 py-3 font-display text-xl font-bold">
                  {t}
                </td>
              ))}
            </tr>
          </tfoot>
        </table>
      </div>
      <p className="mt-4 text-sm text-ink-soft">
        The total is a way to compare your own notes, not a verdict. A single missing line, such as a refusal to allow independent testing, can matter more than the
        sum. Nothing you type is stored or sent.
      </p>
    </div>
  );
}

export function ChecklistTool() {
  const [done, setDone] = useState<Record<string, boolean>>({});
  const all = checklist.flatMap((g) => g.items);
  const count = all.filter((i) => done[i]).length;
  return (
    <div>
      <p className="label text-ink-soft" aria-live="polite">
        {count} of {all.length} done
      </p>
      <div
        className="mt-2 h-2 w-full bg-ink/10"
        role="progressbar"
        aria-label="Launch checklist progress"
        aria-valuemin={0}
        aria-valuemax={all.length}
        aria-valuenow={count}
      >
        <div className="h-full bg-blue transition-[width]" style={{ width: `${(count / all.length) * 100}%` }} />
      </div>
      <div className="mt-8 grid gap-x-12 gap-y-8 md:grid-cols-2">
        {checklist.map((g) => (
          <fieldset key={g.group} className="border-t border-ink/20 pt-4">
            <legend className="heading-sm pr-3">{g.group}</legend>
            <ul className="mt-3 space-y-3">
              {g.items.map((item) => (
                <li key={item}>
                  <label className="flex cursor-pointer items-start gap-3">
                    <input
                      type="checkbox"
                      className="mt-1 size-4 accent-blue"
                      checked={!!done[item]}
                      onChange={(e) => setDone((d) => ({ ...d, [item]: e.target.checked }))}
                    />
                    <span className={done[item] ? "text-ink-soft line-through" : ""}>{item}</span>
                  </label>
                </li>
              ))}
            </ul>
          </fieldset>
        ))}
      </div>
      <p className="mt-6 text-sm text-ink-soft">A ticked list is not an approval. It shows what you have covered so that you can talk it through with your own advisers.</p>
    </div>
  );
}
