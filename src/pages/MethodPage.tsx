import { ApplyLink } from "../components/ApplyLink";
import { FaqItem } from "../components/FaqItem";
import {
  AskVisual,
  MonthlyCheckVisual,
  OneDatabaseVisual,
  PriorityPlot,
  QuietLeadsVisual,
  RecordVisual,
  SourcesVisual,
} from "../components/MethodVisuals";

const STEPS = [
  { n: 1, title: "Audit.", copy: "We map where every lead and promise lives today.", Visual: SourcesVisual },
  { n: 2, title: "Decide.", copy: "We choose the first problem to fix. We write down where it stands today.", Visual: PriorityPlot },
  { n: 3, title: "One place.", copy: "Your data moves into one database in your own account.", Visual: OneDatabaseVisual },
  { n: 4, title: "The record.", copy: "Every piece of work done on it gets logged. You get an admin screen to see it.", Visual: RecordVisual },
  { n: 5, title: "The first automation.", copy: "I build it to find the leads that have gone quiet and draft the follow-up.", Visual: QuietLeadsVisual },
  { n: 6, title: "The assistant.", copy: "An assistant works from your data. Your team learns to ask it.", Visual: AskVisual },
  { n: 7, title: "Handover.", copy: "You run it. I show you what to check each month.", Visual: MonthlyCheckVisual },
];

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
    answer: "If your answers fit, we book a short call.",
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

export function MethodPage() {
  return (
    <>
      <section className="max-w-3xl mx-auto px-6 pt-24 pb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">The seven days</h1>
        <div className="text-cool-grey space-y-1">
          <p>This is the plan for the week. The platform is still being built.</p>
          <p>I come to your offices.</p>
          <p>The steps run in this order. Some are quick. Some take more of the week.</p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-12 text-center border-y border-card-border">
        <h2 className="text-2xl font-bold mb-6">Where does your business live?</h2>
        <p className="text-cool-grey mb-6">Do your leads sit in DMs and your promises in email?</p>
        <div className="text-cool-grey space-y-1">
          <p>If it lives in your head, nobody else can pick it up.</p>
          <p>So leads go cold, and you cannot see the pipeline.</p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-16 space-y-24">
        {STEPS.map(({ n, title, copy, Visual }, i) => (
          <div key={n} className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
            <div className={i % 2 ? "md:order-2" : ""}>
              <h2 className="mb-4 text-3xl font-bold">
                <span className="text-gold">Step {n}.</span> {title}
              </h2>
              <p className="text-lg text-cool-grey">{copy}</p>
            </div>
            <div className={i % 2 ? "md:order-1" : ""}>
              <Visual />
            </div>
          </div>
        ))}
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16 text-center border-y border-card-border">
        <h2 className="text-2xl font-bold mb-6">After the seven days</h2>
        <p className="text-cool-grey">A monthly retainer keeps the platform healthy.</p>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16 text-center">
        <h2 className="text-2xl font-bold mb-6">What you own at the end</h2>
        <div className="text-cool-grey space-y-1 mb-6">
          <p>Your data and code sit in accounts in your name.</p>
          <p>Every piece of work is recorded. An admin screen shows who did what.</p>
        </div>
        <div className="text-cool-grey space-y-1">
          <p>AI vendors sell you their platform.</p>
          <p>I diagnose first. Then I install one that is yours.</p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16 text-center border-y border-card-border">
        <h2 className="text-2xl font-bold mb-6">What I cannot tell you yet</h2>
        <div className="text-cool-grey space-y-1">
          <p>You would be one of the first three.</p>
          <p>I cannot give you a start date yet.</p>
          <p>I build each of the first three myself.</p>
          <p>I will not quote a founder result until one is real.</p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16 text-center">
        <h2 className="text-2xl font-bold mb-6">Who I say no to</h2>
        <div className="text-cool-grey space-y-1">
          <p>Anyone who will not run the first step themselves.</p>
          <p>Anyone who cannot say who decides.</p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 pb-16 border-t border-card-border pt-16">
        <h2 className="text-2xl font-bold text-center mb-12">Questions</h2>
        <div className="space-y-6">
          {FAQS.map((faq) => (
            <FaqItem key={faq.question} question={faq.question} answer={faq.answer} />
          ))}
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
        />
      </section>

      <section className="max-w-3xl mx-auto px-6 pb-24 text-center">
        <ApplyLink />
      </section>
    </>
  );
}
