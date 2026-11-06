import type { ReactNode } from "react";

/**
 * Small illustrations for the seven days. Every one is an example, not real
 * data, and none carries a number: the plan says no result may be claimed
 * until a founder has one. Colours come from the brand tokens only.
 */

function Frame({ children }: { children: ReactNode }) {
  return (
    <figure className="rounded-lg border border-card-border bg-card-slate p-6">
      {children}
      <figcaption className="mt-5 text-xs text-cool-grey">Example. Not real data.</figcaption>
    </figure>
  );
}

const SOURCES = ["DMs", "Inbox", "Calls", "Spreadsheets"];

/** Step 1: the places a business lives today. */
export function SourcesVisual() {
  return (
    <Frame>
      <p className="mb-4 text-sm text-cool-grey">Where it lives today</p>
      <div className="flex flex-wrap gap-3">
        {SOURCES.map((s) => (
          <span key={s} className="rounded-md border border-card-border px-3 py-2 text-sm">
            {s}
          </span>
        ))}
        <span className="rounded-md border border-gold px-3 py-2 text-sm text-gold">In your head</span>
      </div>
    </Frame>
  );
}

/** Step 2: what the audit produces. Effort across, value up. The first problem is gold. */
export function PriorityPlot() {
  return (
    <Frame>
      <svg
        viewBox="0 0 320 240"
        role="img"
        aria-label="Example plot of effort against value. Quick wins sit top left, one big swing sits top right, and the first problem to fix is highlighted."
        className="w-full h-auto font-sans"
      >
        <line x1="24" y1="12" x2="24" y2="210" stroke="#374151" strokeWidth="1" />
        <line x1="24" y1="210" x2="312" y2="210" stroke="#374151" strokeWidth="1" />
        <line x1="168" y1="12" x2="168" y2="210" stroke="#374151" strokeWidth="1" strokeDasharray="3 4" />
        <line x1="24" y1="111" x2="312" y2="111" stroke="#374151" strokeWidth="1" strokeDasharray="3 4" />

        <text x="34" y="30" fontSize="12" fill="#B0B8C4">Quick wins</text>
        <text x="178" y="30" fontSize="12" fill="#B0B8C4">Big swing</text>

        <circle cx="128" cy="86" r="7" fill="#B0B8C4" stroke="#1F2937" strokeWidth="2" />
        <circle cx="64" cy="94" r="7" fill="#B0B8C4" stroke="#1F2937" strokeWidth="2" />
        <circle cx="244" cy="70" r="9" fill="#B0B8C4" stroke="#1F2937" strokeWidth="2" />
        <circle cx="86" cy="60" r="8" fill="#D4A843" stroke="#1F2937" strokeWidth="2" />
        <text x="100" y="64" fontSize="12" fill="#F0EFE8">First problem</text>

        <circle cx="96" cy="166" r="6" fill="none" stroke="#B0B8C4" strokeWidth="1.5" />
        <circle cx="236" cy="172" r="6" fill="none" stroke="#B0B8C4" strokeWidth="1.5" />
        <circle cx="200" cy="146" r="6" fill="none" stroke="#B0B8C4" strokeWidth="1.5" />

        <text x="24" y="230" fontSize="12" fill="#B0B8C4">Less effort</text>
        <text x="312" y="230" fontSize="12" fill="#B0B8C4" textAnchor="end">More effort</text>
        <text x="14" y="111" fontSize="12" fill="#B0B8C4" textAnchor="middle" transform="rotate(-90 14 111)">Value</text>
      </svg>
    </Frame>
  );
}

/** Step 3: the scattered places flow into one database. */
export function OneDatabaseVisual() {
  const ys = [14, 54, 94, 134];
  return (
    <Frame>
      <svg
        viewBox="0 0 320 180"
        role="img"
        aria-label="Example of four scattered sources feeding one database in your own account."
        className="w-full h-auto font-sans"
      >
        {ys.map((y, i) => (
          <g key={SOURCES[i]}>
            <rect x="4" y={y} width="96" height="30" rx="6" fill="none" stroke="#374151" />
            <text x="52" y={y + 20} fontSize="12" fill="#F0EFE8" textAnchor="middle">{SOURCES[i]}</text>
            <line x1="100" y1={y + 15} x2="212" y2="90" stroke="#B0B8C4" strokeWidth="1.5" />
          </g>
        ))}
        <rect x="212" y="50" width="104" height="80" rx="8" fill="#1F2937" stroke="#D4A843" />
        <text x="264" y="86" fontSize="13" fill="#F0EFE8" textAnchor="middle">Your database</text>
        <text x="264" y="106" fontSize="11" fill="#B0B8C4" textAnchor="middle">in your account</text>
      </svg>
    </Frame>
  );
}

const LOG: [string, string][] = [
  ["You", "Added a lead"],
  ["Assistant", "Drafted a follow-up"],
  ["You", "Sent it"],
];

/** Step 4: the record of work, as the admin screen shows it. */
export function RecordVisual() {
  return (
    <Frame>
      <p className="mb-3 text-sm text-cool-grey">Admin screen</p>
      <ul className="divide-y divide-card-border text-sm">
        {LOG.map(([who, what], i) => (
          <li key={i} className="grid grid-cols-[6rem_1fr] gap-4 py-3">
            <span className="text-cool-grey">{who}</span>
            <span>{what}</span>
          </li>
        ))}
      </ul>
    </Frame>
  );
}

function Bars({ widths }: { widths: string[] }) {
  return (
    <div className="space-y-2" aria-hidden="true">
      {widths.map((w, i) => (
        <div key={i} className="h-2.5 rounded-sm bg-card-border" style={{ width: w }} />
      ))}
    </div>
  );
}

/** Step 5: quiet leads found, follow-up drafted. */
export function QuietLeadsVisual() {
  return (
    <Frame>
      <p className="mb-3 text-sm text-cool-grey">Gone quiet</p>
      <Bars widths={["80%", "64%", "72%"]} />
      <p className="mt-6 mb-3 text-sm text-cool-grey">Draft follow-up</p>
      <div className="rounded-md border border-card-border p-4">
        <Bars widths={["92%", "100%", "58%"]} />
      </div>
    </Frame>
  );
}

/** Step 6: the question, answered from the founder's own data. */
export function AskVisual() {
  return (
    <Frame>
      <p className="ml-auto max-w-[85%] rounded-lg border border-card-border px-4 py-3 text-sm">
        Who have I gone quiet on, and what is it worth?
      </p>
      <div className="mt-4 rounded-lg border border-card-border p-4">
        <p className="mb-3 text-sm text-cool-grey">Answered from your own data</p>
        <Bars widths={["88%", "70%", "76%"]} />
      </div>
    </Frame>
  );
}

const CHECKS = ["Is it up to date?", "Are the backups tested?", "What has gone stale?"];

/** Step 7: what the founder checks each month. */
export function MonthlyCheckVisual() {
  return (
    <Frame>
      <p className="mb-4 text-sm text-cool-grey">The monthly check</p>
      <ul className="space-y-3 text-sm">
        {CHECKS.map((c) => (
          <li key={c} className="flex items-center gap-3">
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
              <rect x="1.5" y="1.5" width="13" height="13" rx="3" fill="none" stroke="#B0B8C4" strokeWidth="1.5" />
            </svg>
            {c}
          </li>
        ))}
      </ul>
    </Frame>
  );
}
