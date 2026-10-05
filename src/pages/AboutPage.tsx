import { ApplyLink } from "../components/ApplyLink";

export function AboutPage() {
  return (
    <>
      <section className="max-w-3xl mx-auto px-6 pt-24 pb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">Hi, I&apos;m Steve.</h1>
        <p className="text-cool-grey">I run Platform Fix from London.</p>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16 text-center border-y border-card-border">
        <div className="text-cool-grey space-y-1">
          <p>Fifteen years in production infrastructure.</p>
          <p>Fifty-plus platform audits, from Series B to FTSE 250.</p>
          <p>Former maintainer of Flux, an open-source Kubernetes deployment tool.</p>
          <p>More than 6,000 engineers trained on cloud-native tooling.</p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16 text-center">
        <div className="text-cool-grey space-y-1">
          <p>The average audit recovers about £276,000 a year for an engineering team.</p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 pb-24 text-center">
        <ApplyLink />
      </section>
    </>
  );
}
