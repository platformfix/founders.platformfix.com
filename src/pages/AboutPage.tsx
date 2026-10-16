import { ApplyLink } from "../components/ApplyLink";

export function AboutPage() {
  return (
    <>
      <section className="max-w-3xl mx-auto px-6 pt-24 pb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">Hi, I&apos;m Steve.</h1>
        <p className="text-cool-grey">I run Platform Fix from London.</p>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16 text-center border-y border-card-border">
        <h2 className="text-2xl font-bold mb-8">How I got here</h2>
        <div className="text-cool-grey space-y-8">
          <div className="space-y-1">
            <p>I built Platform Fix. Then I resented it.</p>
            <p>I was stretched thin and running on empty.</p>
          </div>
          <div className="space-y-1">
            <p>I had to transform Platform Fix myself.</p>
            <p>About 60 to 70 percent of my business now runs on AI.</p>
            <p>Now I help founders do the same.</p>
          </div>
          <div className="space-y-1">
            <p>I have always been fascinated by systems.</p>
            <p>I enjoy designing them.</p>
            <p>Backing founders is what I love most.</p>
            <p>When they see the help is real, they get hours of their week back.</p>
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16 text-center">
        <h2 className="text-2xl font-bold mb-8">The record</h2>
        <div className="text-cool-grey space-y-1 mb-6">
          <p>Fifteen years in production infrastructure.</p>
          <p>Fifty-plus platform audits, from Series B to FTSE 250.</p>
          <p>Former maintainer of Flux, an open-source Kubernetes deployment tool.</p>
          <p>More than 6,000 engineers trained on cloud-native tooling.</p>
        </div>
        <p className="text-cool-grey">The average audit recovers about £276,000 a year for an engineering team.</p>
      </section>

      <section className="max-w-3xl mx-auto px-6 pb-24 text-center">
        <ApplyLink />
      </section>
    </>
  );
}
