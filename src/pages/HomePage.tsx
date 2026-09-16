import { Link } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQS = [
  {
    question: "What exactly do you build?",
    answer:
      "Whatever produces the biggest result for your specific business: a centralised system for your data, a first automation that removes a repeated manual task, or a working AI agent. We scope it during Identify, then build it during Develop.",
  },
  {
    question: "How is this different from hiring a developer or an agency?",
    answer:
      "We bring platform-engineering discipline, the same reliability and security standards used at enterprise scale, to a build that's usually vibe-coded or half-finished. You get one person who scopes, builds, and stays until it's adopted.",
  },
  {
    question: "What does it cost?",
    answer:
      "It depends on scope. Tell us what you're working on on the work-with-us form and we'll come back with a fixed project cost, not an hourly guess.",
  },
  {
    question: "How fast can we start?",
    answer:
      "We start with a short call to understand where your time and money are actually leaking, usually within a week of you reaching out.",
  },
  {
    question: "Do I need any technical background?",
    answer: "No. That's the point of hiring us. You know your business; we handle the engineering.",
  },
  {
    question: "Who is this for?",
    answer:
      "Founders and small teams who don't have an in-house developer or AI team, and don't want to hire one just to get started.",
  },
];

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

const PHASES = [
  {
    id: "identify",
    name: "Identify",
    copy:
      "We map where time and money are actually leaking, then narrow to the handful of opportunities worth building.",
  },
  {
    id: "develop",
    name: "Develop",
    copy:
      "We build directly into the tools you already use, engineered to hold up under real traffic.",
  },
  {
    id: "adopt",
    name: "Adopt",
    copy:
      "We stay until the new system is simply how your team works, day to day.",
  },
];

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-lg border border-card-border bg-card-slate p-6">
      <h3 className="font-bold">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="flex w-full items-center justify-between gap-4 text-left"
        >
          {question}
          <span className="text-gold flex-shrink-0 text-xl leading-none">{open ? "−" : "+"}</span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="text-cool-grey text-sm mt-4">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

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
          say what changed. You don't need another tool. You need someone to build the
          <span className="text-gold"> right thing</span> and make it stick.
        </p>
        <Link
          to="/work-with-us"
          className="inline-flex items-center justify-center gap-2 rounded-md bg-gold px-6 py-3 font-medium text-navy hover:opacity-90"
        >
          Get in touch
        </Link>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16 text-center border-y border-card-border">
        <h2 className="text-2xl font-bold mb-4">Why Platform Fix</h2>
        <p className="text-cool-grey">
          Platform Fix is run by Steve Wade: fifteen years in production infrastructure,
          fifty-plus platform transformations from Series B to FTSE 250, former Flux
          maintainer. The average audit recovers about £276,000 a year, just by deleting
          what nobody needed.
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-20">
        <h2 className="text-2xl font-bold text-center mb-12">Our work has three parts</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {PHASES.map((phase, i) => (
            <motion.div
              key={phase.id}
              className="rounded-lg border border-card-border bg-card-slate p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <span className="text-gold font-bold text-sm">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="text-xl font-bold mt-2 mb-3">{phase.name}</h3>
              <p className="text-cool-grey text-sm mb-4">{phase.copy}</p>
              <Link to={`/services#${phase.id}`} className="text-gold text-sm hover:underline">
                View service →
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-20">
        <h2 className="text-2xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {FAQS.map((faq, i) => (
            <motion.div
              key={faq.question}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <FaqItem question={faq.question} answer={faq.answer} />
            </motion.div>
          ))}
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
        />
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
