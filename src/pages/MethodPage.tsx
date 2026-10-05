import { ApplyLink } from "../components/ApplyLink";

const DAYS = [
  ["Day 1. Audit.", "We map where every lead, promise and conversation lives today."],
  ["Day 2. Decide.", "We choose the first problem to fix. We write down where it stands today."],
  ["Day 3. One place.", "Your data moves into one database in your own account."],
  ["Day 4. The record.", "Every piece of work done on it gets logged. You get an admin screen to see it."],
  ["Day 5. The first automation.", "I build it to find the leads that have gone quiet and draft the follow-up."],
  ["Day 6. The assistant.", "An assistant works from your data. Your team learns to ask it."],
  ["Day 7. Handover.", "You run it. I show you what to check each month."],
];

export function MethodPage() {
  return (
    <>
      <section className="max-w-3xl mx-auto px-6 pt-24 pb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">The seven days</h1>
        <div className="text-cool-grey space-y-1">
          <p>This is the plan for the week. The platform is still being built.</p>
          <p>I come to your offices.</p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 pb-16 space-y-6">
        {DAYS.map(([name, copy]) => (
          <div key={name} className="rounded-lg border border-card-border bg-card-slate p-6">
            <h2 className="text-xl font-bold mb-2">{name}</h2>
            <p className="text-cool-grey text-sm">{copy}</p>
          </div>
        ))}
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16 text-center border-y border-card-border">
        <h2 className="text-2xl font-bold mb-6">After the seven days</h2>
        <p className="text-cool-grey">A monthly retainer keeps the platform healthy.</p>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16 text-center">
        <h2 className="text-2xl font-bold mb-6">Who I say no to</h2>
        <div className="text-cool-grey space-y-1">
          <p>Anyone who will not run the first step themselves.</p>
          <p>Anyone who cannot say who decides.</p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 pb-24 text-center">
        <ApplyLink />
      </section>
    </>
  );
}
