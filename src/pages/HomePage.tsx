import { Link } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ApplyLink } from "../components/ApplyLink";
import { OFFER_NAME } from "../lib/apply";

const FAQS = [
  {
    question: "What does it cost?",
    answer:
      "I do not publish prices. I ask what the result is worth to you first. Then I give you three options.",
  },
  {
    question: "Do I need a technical background?",
    answer: "It runs from a terminal. I do the building. I am testing how much of it you ever open.",
  },
  {
    question: "What happens after I apply?",
    answer: "I read your answers. If it fits, we book a short call.",
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

const BLOCKS = [
  {
    id: "audit",
    name: "Days 1 and 2. Audit and decide.",
    copy: "We map where your business lives. We pick the first problem and measure it.",
  },
  {
    id: "build",
    name: "Days 3 to 7. Build and hand over.",
    copy:
      "Your data moves into one database you own. I build the first automation to find the leads that have gone quiet. Your team learns to run it.",
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
        <p className="text-sm uppercase tracking-widest text-gold mb-6">{OFFER_NAME} by Platform Fix</p>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
          Who have you gone quiet on, and what is it worth?
        </h1>
        <div className="text-lg text-cool-grey mb-6 space-y-1">
          <p>I spend seven days in your business.</p>
          <p>You end the week knowing who has gone quiet and what they are worth.</p>
          <p>
            Everything sits in one place <span className="text-gold">you own.</span>
          </p>
          <p>After that, a monthly retainer keeps it healthy.</p>
        </div>
        <div className="text-cool-grey mb-10 space-y-1">
          <p>For founders with a team of two to five.</p>
          <p>If the business only works because it lives in your head, this is for you.</p>
        </div>
        <ApplyLink />
        <div className="text-sm text-cool-grey mt-6 space-y-1">
          <p>Applying costs nothing and commits you to nothing.</p>
          <p>I am choosing three founders to start with.</p>
          <p>I have run fifty-plus platform audits.</p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16 text-center border-y border-card-border">
        <h2 className="text-2xl font-bold mb-6">Where does your business live?</h2>
        <p className="text-cool-grey mb-6">
          Do your leads sit in DMs, your promises in email, your context in spreadsheets?
        </p>
        <div className="text-cool-grey space-y-1">
          <p>If it is in your head, nobody else can pick it up.</p>
          <p>So leads go cold, and you cannot see the pipeline.</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-20">
        <h2 className="text-2xl font-bold text-center mb-12">Seven days at your offices</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {BLOCKS.map((block, i) => (
            <motion.div
              key={block.id}
              className="rounded-lg border border-card-border bg-card-slate p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <h3 className="text-xl font-bold mb-3">{block.name}</h3>
              <p className="text-cool-grey text-sm">{block.copy}</p>
            </motion.div>
          ))}
        </div>
        <p className="text-center mt-8">
          <Link to="/method" className="text-gold hover:underline">
            See the day-by-day →
          </Link>
        </p>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16 text-center border-y border-card-border">
        <h2 className="text-2xl font-bold mb-6">What you own</h2>
        <div className="text-cool-grey space-y-1 mb-6">
          <p>Your data and your code sit in accounts in your name.</p>
          <p>A record of every piece of work done on it.</p>
          <p>An admin screen that shows who did what.</p>
        </div>
        <div className="text-cool-grey space-y-1">
          <p>AI vendors sell you their platform.</p>
          <p>I diagnose first. Then I install one that is yours.</p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16 text-center">
        <h2 className="text-2xl font-bold mb-6">What I cannot tell you yet</h2>
        <div className="text-cool-grey space-y-1">
          <p>I have no founder case studies.</p>
          <p>You would be one of the first three.</p>
          <p>The platform is still being built.</p>
          <p>I cannot give you a start date yet.</p>
          <p>I build each of the first three myself.</p>
          <p>I will not quote a founder result until one is real.</p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-20 border-t border-card-border">
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
        <h2 className="text-2xl font-bold mb-8">Tell me about your business.</h2>
        <ApplyLink />
      </section>
    </>
  );
}
