import { Link } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MAP_CTA = "Get the free map of where your leads and promises live";

const FAQS = [
  {
    question: "What exactly do you build?",
    answer:
      "One database in your own account holds every lead, promise and conversation. A record of every piece of work is kept automatically. An assistant works from it, and the first job is lead reactivation.",
  },
  {
    question: "What does it cost?",
    answer:
      "I do not publish prices. I ask what the result is worth to you first. Then I give you three options.",
  },
  {
    question: "Do I need a technical background?",
    answer:
      "It runs from a terminal and needs Git. I am testing how much of that you ever need to open. If it blocks the first session, the refund applies.",
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

const STEPS = [
  {
    id: "map",
    name: "Map",
    lines: [
      "A free one-page map of where your leads, clients and context sit today.",
      "It shows you the problem. It does not fix it.",
      "A few questions first, so I know it fits.",
    ],
  },
  {
    id: "diagnose",
    name: "Diagnose",
    lines: [
      "A paid, guided first session. It needs about two and a half hours of your time.",
      "We find where your conversations leak.",
      "The session is built around one question. Who have I gone quiet on, and what is it worth?",
      "Bring your completed map to the session.",
      "I will name who you have gone quiet on and what they are worth.",
      "If I cannot, I refund the fee.",
    ],
  },
  {
    id: "install",
    name: "Install",
    lines: [
      "I set up the platform on your business.",
      "One database, in your own account. Every lead, promise and conversation goes into it.",
      "An assistant works from it. The first job is finding every lead gone quiet and drafting the follow-up.",
      "Then I keep it healthy for a monthly fee.",
    ],
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

function MapCta() {
  return (
    <Link
      to="/work-with-us"
      className="inline-flex items-center justify-center gap-2 rounded-md bg-gold px-6 py-3 font-medium text-navy hover:opacity-90"
    >
      {MAP_CTA}
    </Link>
  );
}

export function HomePage() {
  return (
    <>
      <section className="max-w-4xl mx-auto px-6 pt-24 pb-16 text-center">
        <p className="text-sm uppercase tracking-widest text-gold mb-6">Platform Fix for Founders</p>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
          Who have you gone quiet on, and what is it worth?
        </h1>
        <div className="text-lg text-cool-grey mb-6 space-y-1">
          <p>I help small-team founders stop losing business in DMs and spreadsheets.</p>
          <p>I diagnose the leaks first.</p>
          <p>
            You get a platform <span className="text-gold">you own.</span>
          </p>
        </div>
        <div className="text-cool-grey mb-10 space-y-1">
          <p>For founders with a team of two to five.</p>
          <p>Agencies, advisory firms, events businesses and consultancies.</p>
        </div>
        <MapCta />
        <div className="text-sm text-cool-grey mt-6 space-y-1">
          <p>The map is free. I am choosing three founders to build for first.</p>
          <p>Fifty-plus platform audits, Series B to FTSE 250. Former Flux maintainer.</p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16 text-center border-y border-card-border">
        <h2 className="text-2xl font-bold mb-6">The business is in your head.</h2>
        <div className="text-cool-grey space-y-1 mb-6">
          <p>Leads sit in DMs.</p>
          <p>Promises sit in email.</p>
          <p>Context sits in spreadsheets.</p>
        </div>
        <div className="text-cool-grey space-y-1">
          <p>Nobody else can pick it up.</p>
          <p>So leads go cold, and you cannot see the pipeline.</p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-20">
        <h2 className="text-2xl font-bold text-center mb-12">How it works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.id}
              className="rounded-lg border border-card-border bg-card-slate p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <span className="text-gold font-bold text-sm">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="text-xl font-bold mt-2 mb-3">{step.name}</h3>
              <div className="text-cool-grey text-sm space-y-2">
                {step.lines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16 text-center border-y border-card-border">
        <h2 className="text-2xl font-bold mb-6">What you own</h2>
        <div className="text-cool-grey space-y-1 mb-6">
          <p>Your data, in your own Supabase account.</p>
          <p>The code, in your own git repository.</p>
          <p>A record of every piece of work done on it.</p>
        </div>
        <div className="text-cool-grey space-y-1">
          <p>AI vendors sell you their platform.</p>
          <p>I diagnose first. Then I install one that is yours.</p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16 text-center">
        <h2 className="text-2xl font-bold mb-6">Why me</h2>
        <div className="text-cool-grey space-y-1 mb-6">
          <p>Fifteen years in production infrastructure.</p>
          <p>Fifty-plus platform audits, from Series B to FTSE 250.</p>
          <p>Former Flux maintainer.</p>
        </div>
        <div className="text-cool-grey space-y-1">
          <p>The average audit recovers about £276,000 a year.</p>
          <p>
            Those were engineering teams. This is the same discipline, pointed at one
            founder&apos;s business.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16 text-center border-y border-card-border">
        <h2 className="text-2xl font-bold mb-6">What I cannot tell you yet</h2>
        <div className="text-cool-grey space-y-1">
          <p>I have no founder case studies.</p>
          <p>Nobody has run this on their own business and published the result.</p>
          <p>The platform is still being built.</p>
          <p>So I am starting with three founders, and I build each one myself.</p>
          <p>I will not quote a founder result until one is real.</p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16 text-center">
        <h2 className="text-2xl font-bold mb-6">Who I say no to</h2>
        <div className="text-cool-grey space-y-1">
          <p>A solo founder with no team.</p>
          <p>Anyone who will not run the first step themselves this week.</p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-20">
        <h2 className="text-2xl font-bold text-center mb-12">Questions</h2>
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
        <h2 className="text-2xl font-bold mb-4">Start with the map.</h2>
        <p className="text-cool-grey mb-8">One page. Free. It shows you where your leads and promises live.</p>
        <MapCta />
      </section>
    </>
  );
}
