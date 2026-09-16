import { Link } from "react-router-dom";

const PHASES = [
  {
    id: "identify",
    name: "Identify",
    copy:
      "We start by understanding how your business actually runs today — where time is lost, decisions stall, and manual work piles up. Then we narrow to the handful of opportunities worth building.",
  },
  {
    id: "develop",
    name: "Develop",
    copy:
      "Once priorities are clear, we build — plugged into your existing tools, engineered to hold up under real use, not a fragile demo.",
  },
  {
    id: "adopt",
    name: "Adopt",
    copy:
      "We work alongside you until the new system is just how things get done, not a project you're left to maintain alone.",
  },
];

export function HomePage() {
  return (
    <>
      <section className="max-w-4xl mx-auto px-6 pt-24 pb-16 text-center">
        <p className="text-sm uppercase tracking-widest text-gold mb-6">Platform Fix for Founders</p>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
          You've bought the AI tools. Read the case studies. Sat through the demos.
        </h1>
        <p className="text-lg text-cool-grey mb-10">
          But months later, the tools sit unused, the pilots never scaled, and nobody can
          say what changed. You don't need another tool — you need someone to build the
          <span className="text-gold"> right thing</span> and make it stick.
        </p>
        <Link
          to="/work-with-us"
          className="inline-flex items-center justify-center gap-2 rounded-md bg-gold px-6 py-3 font-medium text-navy hover:opacity-90"
        >
          Get in touch
        </Link>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-20">
        <h2 className="text-2xl font-bold text-center mb-12">Our work has three parts</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {PHASES.map((phase, i) => (
            <div key={phase.id} className="rounded-lg border border-card-border bg-card-slate p-6">
              <span className="text-gold font-bold text-sm">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="text-xl font-bold mt-2 mb-3">{phase.name}</h3>
              <p className="text-cool-grey text-sm mb-4">{phase.copy}</p>
              <Link to={`/services#${phase.id}`} className="text-gold text-sm hover:underline">
                View service →
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to talk?</h2>
        <p className="text-cool-grey mb-8">Tell us what you're working on and where it's stuck.</p>
        <Link
          to="/work-with-us"
          className="inline-flex items-center justify-center gap-2 rounded-md bg-gold px-6 py-3 font-medium text-navy hover:opacity-90"
        >
          Get in touch
        </Link>
      </section>
    </>
  );
}
