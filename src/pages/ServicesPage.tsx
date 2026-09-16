const PHASES = [
  {
    id: "identify",
    name: "Identify",
    tagline: "Decide what's actually worth building",
    copy:
      "This phase runs as structured conversations with the people doing the actual work, cross-checked against how requests really move through your systems. It ends with a ranked list of opportunities, ordered by impact and effort.",
    items: [
      ["Founder Alignment Sessions", "Get clear on priorities, constraints, and what success actually looks like."],
      ["Operational Walkthroughs", "See where the work really happens."],
      ["ROI Modelling", "Pressure-test an idea before committing budget to it."],
      ["Prioritisation Mapping", "Rank opportunities by impact and effort so it's obvious where to start."],
      ["AI Readiness Review", "A clear view of what's ready now, what needs work, and what should wait."],
    ],
  },
  {
    id: "develop",
    name: "Develop",
    tagline: "Build it right so it works from day one",
    copy:
      "This is the build phase. Every system ships wired directly into your existing stack and gets tested against real usage patterns before your team ever sees it.",
    items: [
      ["Scoping & Architecture", "Turn priorities into a build plan: scope, data flows, and success criteria upfront."],
      ["Systems Integration", "Fit the build into how work already happens."],
      ["Proof of Concept → Production", "Build fast, test in real use, then harden what works."],
      ["Reliability & Guardrails", "Access controls and monitoring so the system is safe and dependable."],
      ["Performance Tuning", "Improve accuracy, speed, and cost before rolling out broadly."],
    ],
  },
  {
    id: "adopt",
    name: "Adopt",
    tagline: "Make it part of how work actually gets done",
    copy:
      "Shipping isn't the finish line. Adoption is. We work alongside your team until the system is trusted and used every day.",
    items: [
      ["Controlled Rollout", "Introduce the system deliberately, gather feedback, refine before scaling."],
      ["Hands-On Enablement", "Practical training so the team knows when and how to use what's built."],
      ["Workflow Integration", "Fold the new system into existing routines without slowing anyone down."],
      ["Ongoing Optimisation", "Measure impact and keep improving once it's live."],
    ],
  },
];

export function ServicesPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-20 space-y-24">
      {PHASES.map((phase, i) => (
        <section id={phase.id} key={phase.id} className="scroll-mt-24">
          <span className="text-gold font-bold text-sm">{String(i + 1).padStart(2, "0")}</span>
          <h2 className="text-3xl font-bold mt-2 mb-2">{phase.name}</h2>
          <p className="text-lg text-off-white mb-4">{phase.tagline}</p>
          <p className="text-cool-grey mb-8 max-w-2xl">{phase.copy}</p>
          <h3 className="text-sm uppercase tracking-widest text-gold mb-4">What We Do</h3>
          <ul className="grid md:grid-cols-2 gap-4">
            {phase.items.map(([title, desc]) => (
              <li key={title} className="rounded-lg border border-card-border bg-card-slate p-4">
                <p className="font-medium mb-1">{title}</p>
                <p className="text-sm text-cool-grey">{desc}</p>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
